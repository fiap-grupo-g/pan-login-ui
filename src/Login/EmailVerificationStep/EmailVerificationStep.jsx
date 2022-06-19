import React, { useState, useEffect, useRef } from "react";

import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';
import emailjs from '@emailjs/browser';

import VerificationInput from "react-verification-input";
import { PUBLIC_KEY, SERVICE_ID, VERIFICATION_TEMPLATE_ID } from "../../common/emailjs";

import "./styles.scss";

const EmailVerificationStep = ({
  emailverificationCode,
  setEmailverificationCode,
  handleNext,
}) => {

  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  const form = useRef();

  useEffect(() => {
    createVerificationCode();
  }, []);

  useEffect(() => {
    if (verificationCode && isLoading && !emailSent) {
      sendEmail();
      setEmailSent(true);
    }
  }, [verificationCode])

  const isEmailVerificationReady = () => emailverificationCode == verificationCode;

  const createVerificationCode = () => {
    const randomVerificationCode = Math.floor(100000 + Math.random() * 900000);
    console.log(randomVerificationCode);
    setVerificationCode(randomVerificationCode);
  }

  const sendEmail = () => {
    if (!form.current) return;

    emailjs.sendForm(SERVICE_ID, VERIFICATION_TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setIsLoading(false);
      }, (error) => {
        console.log(error.text);
        setIsLoading(false);
      });
    form.current.reset();
  };

  const renderEmailForm = () => (
    <form style={{ display: 'none' }} ref={form}>
      <label>Name</label>
      <input type="text" name="user_name" defaultValue="user name"/>
      <label>Email</label>
      <input type="email" name="user_email" defaultValue="test@mail.com"/>
      <label>Message</label>
      <textarea name="message" defaultValue={verificationCode} />
      <input type="submit" value="Send" />
    </form>
  );

  const renderLoader = () => {
    return (
      <div className="email-verification-loader-container">
        <FadingBalls color="#0097e6"/>
      </div>
    )
  };

  const handleFinished = () => {
    if (!isEmailVerificationReady()) return;
    handleNext();
  };

  return (
    isLoading ? 
      <div>
        {renderLoader()}
        {renderEmailForm()}
      </div> :
    <div className="email-verification">
      <h3 className="email-verification-helper-text">Verifique seu email</h3>
      <div className="email-verification-helper-text-subtext">Digite o código de confirmação enviado para seu email</div>
      <VerificationInput 
        value={emailverificationCode} 
        onChange={setEmailverificationCode} 
        removeDefaultStyles
        classNames={{
          container: "email-verification-container",
          character: "email-verification-character",
          characterInactive: "email-verification-character--inactive",
          characterSelected: "email-verification-character--selected",
        }}    
      />
      <div className="confirm-buttom-container">
        <button 
          className={`confirm-buttom-${isEmailVerificationReady() ? 'enabled' : 'disabled'}`}
          onClick={handleFinished}
          >Avançar
        </button>
      </div>
    </div>
  );
}

export default EmailVerificationStep;

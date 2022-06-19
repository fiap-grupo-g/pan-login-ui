import React, { useState, useRef } from "react";

import emailjs from '@emailjs/browser';
import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';
import { IonIcon } from "@ionic/react";
import { 
  arrowBack as arrowBackIcon, 
  checkmarkOutline as checkMarkIcon 
} from 'ionicons/icons';

import "./styles.scss";
import { PUBLIC_KEY, RECOVERY_TEMPLATE_ID, SERVICE_ID } from "../../../common/emailjs";

const PasswordRecover = ({
  handleReturn
}) => {

  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useRef();

  const sendRecoveryEmail = () => {
    setIsSendingEmail(true);
    sendEmail();
  }

  const renderSendingEmail = () => (
    <div className="password-recover-button-loading">
      <FadingBalls color="#0097e6"/>
    </div>
  );

  const renderEmailSent = () => (
    <div className="password-recover-email-sent-container">
      <IonIcon className="password-recover-email-sent-checkmark" icon={checkMarkIcon}/>
      <div className="password-recover-email-sent-text">Email enviado.</div>
    </div>
  );

  const sendEmail = () => {
    if (!form.current) return;

    emailjs.sendForm(SERVICE_ID, RECOVERY_TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
        setIsSendingEmail(false);
        setEmailSent(true);
      }, (error) => {
        console.log(error.text);
        setIsSendingEmail(false);
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
      <textarea name="message" defaultValue="123456" />
      <input type="submit" value="Send" />
    </form>
  );

  return (
    <div className="password-recover">
      <div className="password-recover-header">
          <div className="password-recover-header-button" onClick={() => handleReturn()}>
            <IonIcon size="large" icon={arrowBackIcon}/>
          </div>
        <h3 className="password-recover-header-title">Recuperação de senha</h3>
      </div>
      <div className="password-recover-helper-text">Enviaremos um email para redefinir sua senha</div>
      <div className="password-recover-button-container">
        {isSendingEmail 
          ? renderSendingEmail() : emailSent ? renderEmailSent()
          : <button 
              className={`password-recover-button-${isSendingEmail ? 'ready' : 'ready'}`}
              onClick={sendRecoveryEmail}
              >Enviar email
            </button>
        }
      </div>
      {renderEmailForm()}
    </div>
  );
}

export default PasswordRecover;

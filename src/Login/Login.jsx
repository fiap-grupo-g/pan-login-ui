import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { IonIcon } from "@ionic/react";
import { personCircleOutline as personIcon } from 'ionicons/icons';
import FadingBalls from 'react-cssfx-loading/lib/FadingBalls';

import { performLogin } from "../common/store/thunks/Login";
import { useUserContext } from "../common/context/userContext";
import AuthStepsTracker from "./AuthStepsTracker/AuthStepsTracker";
import EmailVerificationStep from "./EmailVerificationStep/EmailVerificationStep";
import PasswordStep from "./PasswordStep/PasswordStep";
import { instantiateSteps } from "../common/constants";

import "./styles.scss";

const Login = ({
  handleLoginSucess,
}) => {

  const [steps, setSteps] = useState(instantiateSteps);
  const [stepsProgress, setStepsProgress] = useState(0.2);

  const [emailVerificationCode, setEmailVerificationCode] = useState('');

  const { user, setUser } =  useUserContext();

  const dispatch = useDispatch();
  const { login } = useSelector(store => store.performLogin);

  useEffect(() => {
    if (login && login.data && login.data.token && login.data.token.accessToken) {
      setUser({...user, token: login.data.token, username: login.data.username})
      handleLoginSucess();
    }
  }, [login]);

  const nextStep = () => {
    updateSteps();
    updateStepsProgress();
  };

  const updateSteps = () => {
    let updatedSteps = [...steps];
    for (let index = 0; index < steps.length; index++) {
      if (!steps[index].isActive && !steps[index].isCompleted) {
        updatedSteps[index].isActive = true;
        setSteps(updatedSteps);
        return;
      }
      if (!steps[index].isCompleted) {
        updatedSteps[index].isCompleted = true;
        updatedSteps[index].isActive = false;
      }
    };
  };

  const updateStepsProgress = () => {
    setStepsProgress(Math.min(1, stepsProgress + (1 / steps.length)));
  };

  const renderStep = () => {
    if (steps[0].isActive) {
      return <PasswordStep nextStep={nextStep}/>
    }
    if (steps[1].isActive) {
      return (
        <EmailVerificationStep 
          emailverificationCode={emailVerificationCode}
          setEmailverificationCode={setEmailVerificationCode}
          handleNext={handleLogin}
        />
      );
    }
    return (
      <div className="login-loading-container">
        <FadingBalls color="#0097e6"/>
      </div>
    );
  };

  const handleLogin = () => {
    nextStep();
    dispatch(performLogin(user));
  }

  return (
    <div className="login">
      <div className="container">
        <div className="side-bar-container">
          <img className="side-bar-image" src="https://play-lh.googleusercontent.com/XMa2dHPpQlze89nhfDQP6LV9Az01_ayRyxfOw5IQUu6oyBJLLNczL26Oa-UUFwQf4A=w240-h480-rw" />
          <div className="side-bar-profile">
            <IonIcon size="large" icon={personIcon}/>
            <div className="side-bar-profile-text"> Olá!</div>
          </div>
          <div className="side-bar-app">
            <div>Para cartão de crédito, empréstimos e seguros, baixe o app.</div>
            <div className="side-bar-app-button-container">
              <button className="side-bar-app-button">Baixe o app!</button>
            </div>
          </div>
        </div>
        <div className="auth-container">
          <div className="header">
            <AuthStepsTracker steps={steps} stepsProgress={stepsProgress}/>
          </div>
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

export default Login;

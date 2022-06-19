import React from "react";
import { IonIcon } from "@ionic/react";
import { checkmarkOutline as checkMarkIcon } from 'ionicons/icons';

import "./styles.scss";

const AuthStep = ({
  stepNumber,
  text,
  isActive,
  isCompleted
}) => {
  return (
    <div className="auth-steps-step">
      <div className={`auth-steps-outer${isActive ? '-active' : isCompleted ? '-completed' : ''}`}>
        {isCompleted 
          ? <IonIcon size="large" className="auth-steps-checkmark" icon={checkMarkIcon}/>
          : <div className={`auth-steps-inner${isActive ? '-active' : ''}`}>{stepNumber}</div>
        }
      </div>
      <div className={`auth-steps-step-text${isActive ? '-active' : isCompleted ? '-completed' : ''}`}>{text}</div>
    </div>
  );
}

export default AuthStep;

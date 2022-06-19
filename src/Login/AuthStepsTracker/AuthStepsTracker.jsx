import React from "react";

import AuthStep from "./AuthStep/AuthStep";

import "./styles.scss";

const AuthStepsTracker = ({
  steps,
  stepsProgress,
}) => {
  if (!steps) return;

  const innerProgressBarStyle = {
    backgroundColor: '#07b2fd',
    height: '4px',
    width: `${stepsProgress * 100}%`,
    borderRadius: '2px',
    transitionDuration: '1s',
  }

  return (
    <div className="auth-steps-container">
      <div className="auth-steps">
        {steps.map((step, index) => 
          <AuthStep 
            key={index} 
            stepNumber={index + 1} 
            text={step.text} 
            isActive={step.isActive}
            isCompleted={step.isCompleted}
          /> 
        )}
      </div>
      <div className="auth-steps-progress-container">
        <div style={innerProgressBarStyle}/>
      </div>
    </div>
  );
}

export default AuthStepsTracker;

import React, { useState } from "react";

import { useUserContext } from "../../common/context/userContext";

import VirtualKeyboard from "./components/VirtualKeyboard/VirtualKeyboard";
import PasswordDisplay from "./components/PasswordDisplay/PasswordDisplay";
import PasswordRecover from "./PasswordRecover/PasswordRecover";
import { 
  getLastFilledIndex, 
  getNextEmptyIndex, 
  hasEmptyEntry, 
  instantiatePassword 
} from "../../common/utils";

import "./styles.scss";

const PasswordStep = ({
  nextStep
}) => {

  const [password, setPassword] = useState(instantiatePassword);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);

  const { user, setUser } =  useUserContext();

  const updatePassword = (value) => {
    setPassword(value);
    setUser({...user, password: value});
  };

  const passwordAdd = (value) => {
    const index = getNextEmptyIndex(password);
    if (index === null) return;

    let newPassword = [...password];
    newPassword[index] = value;

    updatePassword(newPassword);
  };

  const passwordDeleteLast = () => {
    const index = getLastFilledIndex(password);
    if (index === null) return;

    let newPassword = [...password];
    newPassword[index] = '';

    updatePassword(newPassword);
  }

  const isPasswordReady = () =>
    !hasEmptyEntry(password)

  const handleNext = () => {
    if (!isPasswordReady()) return;
    nextStep();
  }

  const renderPasswordRecovery = () => (
    <PasswordRecover handleReturn={togglePasswordRecovery} />
  );

  const togglePasswordRecovery = () => setIsRecoveringPassword(!isRecoveringPassword);
  
  return (
    isRecoveringPassword ? renderPasswordRecovery() :
    <div>
      <h3 className="helper-text">Digite sua senha de acesso usando o teclado virtual abaixo.</h3>
      <PasswordDisplay password={password}/>
      <div className="recover-password-container">
        <div className="recover-password-text">Esqueceu sua senha?</div>
        <div className="recover-password-button" onClick={() => togglePasswordRecovery()}>Recuperar agora</div>
      </div>
      <VirtualKeyboard 
        passwordAdd={passwordAdd} 
        passwordDeleteLast={passwordDeleteLast}
      />
      <div className="confirm-buttom-container">
        <button 
          className={`confirm-buttom-${isPasswordReady() ? 'enabled' : 'disabled'}`}
          onClick={handleNext}
          >Avançar
        </button>
      </div>
    </div>
  );
}

export default PasswordStep;

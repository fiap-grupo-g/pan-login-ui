import React from "react";
import { useSelector } from 'react-redux';

import { IonIcon } from "@ionic/react";
import { backspaceOutline as backspaceIcon } from 'ionicons/icons';

import "./styles.scss";

const VirtualKeyboard = ({
  passwordDeleteLast,
  passwordAdd
}) => {

  const { preLogin } = useSelector(store => store.performPreLogin);

  const buildOptions = () => {
    if (!preLogin || !preLogin.data || !preLogin.data.keyboard) return '';

    const keyboard = preLogin.data.keyboard;
    return keyboard.map(obj => {
      return `${obj.first}${obj.second}`
    })
  }

  const options = buildOptions();

  return (
    <div className="virtual-keyboard-container">
      {options.map((option, index) => 
        <div key={index} className="virtual-keyboard-outer" onClick={() => passwordAdd(option)}>
          <div className="virtual-keyboard-inner">
            {`${option.substring(0,1)} ou ${option.substring(1,2)}`}
          </div>
        </div>
      )}
      <button className="virtual-keyboard-outer-backspace" onClick={passwordDeleteLast}>
        <IonIcon size="large" className="virtual-keyboard-button" icon={backspaceIcon}/>
      </button>
    </div>
  );
}

export default VirtualKeyboard;

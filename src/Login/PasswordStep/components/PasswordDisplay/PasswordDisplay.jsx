import React from "react";

import "./styles.scss";

const PasswordDisplay = ({
  password
}) => {

  return (
    <div className="password-display-container">
      {password.map((digit, index) => 
        <div key={index} className={`password-display-outer${digit && '-active'}`}>
          <div className={`password-display-inner${digit && '-active'}`}/>
        </div>    
      )}
    </div>
  );
}

export default PasswordDisplay;

import React from "react";
import { useUserContext } from "../common/context/userContext";

import "./styles.scss";

const User = () => {
  const { user } =  useUserContext();

  return (
    <div className="user">
        <div className="user-header">
          <img className="logo" src="https://www.bancopan.com.br/bancopan-institucional/conteudo/estrutura/assets/img/mh-icons/mh-icon--logo-desktop.svg" />
        </div>
        <div className="user-body">
          <div className="user-body-title-container">
            <h3 className="user-body-title-before">Olá,</h3>
            <h3 className="user-body-title">{user.username}</h3>
          </div>
          <h3 className="user-body-subtitle">Você está logado com as seguintes credenciais:</h3>
          <h3 className="user-body-subtitle">{`Type: ${user.token.tokenType}`}</h3>
          <h3 className="user-body-subtitle">{`TokenExpiry: ${user.token.tokenExpiry}`}</h3>
          <h3 className="user-body-subtitle">{`AccessToken: ${user.token.accessToken}`}</h3>
        </div>
    </div>
  );
}

export default User;

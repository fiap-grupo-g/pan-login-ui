import React, { useState } from "react";
import { Provider } from 'react-redux';

import { UserContext } from "./common/context/userContext";
import store from './common/store';
import Home from "./Home/Home";
import Login from "./Login/Login";
import User from "./User/User";

const PanApp = () => {

  const LOGIN_STAGE = {
    HOME: "HOME",
    PRE_LOGIN: "PRE_LOGIN",
    LOGGED: "LOGGED"
  };

  const [mode, setMode] =  useState(LOGIN_STAGE.HOME);

  const handlePreLogin = () => setMode(LOGIN_STAGE.PRE_LOGIN);

  const handleLoginSucess = () => setMode(LOGIN_STAGE.LOGGED);

  const renderLoginStage = () => {
    switch (mode) {
      case LOGIN_STAGE.PRE_LOGIN:
        return <Login handleLoginSucess={handleLoginSucess} />
      case LOGIN_STAGE.LOGGED:
        return <User/>
      default:
        return <Home handlePreLoginSuccess={handlePreLogin} />
    }
  }

  const [user, setUser] = useState("en");
  const userContextValue = { user, setUser };

  return (
    <Provider store={store}>
      <UserContext.Provider value={userContextValue}>
        {renderLoginStage()}
      </UserContext.Provider>
    </Provider>
  )
};

export default PanApp;

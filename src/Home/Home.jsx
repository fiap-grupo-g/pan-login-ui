import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { IonInput } from "@ionic/react";
import { toNumber } from "vanilla-masker";
import ReCAPTCHA from 'react-google-recaptcha';

import { useUserContext } from "../common/context/userContext";
import { performPreLogin } from "../common/store/thunks/preLogin";
import { RECAPTCHA_SITE_KEY, FORMAT_LENGTH } from './constants';
import { toCPF, toCNPJ } from "./utils";

import "./styles.scss";

const Home = ({
  handlePreLoginSuccess,
}) => {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [isReCAPTCHADone, setIsReCAPTCHADone] = useState(false);

  const dispatch = useDispatch();
  const { preLogin } = useSelector(store => store.performPreLogin);

  const { user, setUser } =  useUserContext();

  useEffect(() => {
    if (preLogin && preLogin.data) {
      setUser({...user, cpfCnpj, intentId: preLogin.data.intentId});
      handlePreLoginSuccess();
    }
  }, [preLogin]);

  const updateCpfCnpj = (value) => 
    setCpfCnpj(toNumber(value).substring(0, FORMAT_LENGTH.CNPJ));

  const formattedCpfCnpj = () => 
    cpfCnpj.length <= FORMAT_LENGTH.CPF ? toCPF(cpfCnpj) : toCNPJ(cpfCnpj);

  function onChangeReCAPTCHA(value) {
    console.log('Captcha value:', value);
    setIsReCAPTCHADone(true);
  }

  const isLoginReady = () => isReCAPTCHADone && isCpfCnpjReady()

  const isCpfCnpjReady = () =>
    cpfCnpj.length === FORMAT_LENGTH.CPF || cpfCnpj.length === FORMAT_LENGTH.CNPJ
    
  const handlePreLogin = () => {
    if (!isLoginReady()) return;

    dispatch(performPreLogin({ cpfOrCnpj: cpfCnpj }));
  }

  return (
    <div className="home">
      <div className="container">
        <div className="header">
          <img className="logo" src="https://www.bancopan.com.br/bancopan-institucional/conteudo/estrutura/assets/img/mh-icons/mh-icon--logo-desktop.svg" />
          <h3>Para acessar o web banking, precisamos do seu CPF ou CNPJ</h3>
        </div>
        <div className="bottom-container">
          <IonInput
            value={formattedCpfCnpj()}
            onIonChange={(e) => updateCpfCnpj((e.detail.value))}
            className="cnpj-input"
            placeholder="Digite seu CPF ou CNPJ"
            maxlength={FORMAT_LENGTH.FORMATTED_CNPJ}
          />
          <div className="cnpj-input-helper-text">Use apenas números</div>
          <div className="ReCAPTCHA">
            <ReCAPTCHA
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={onChangeReCAPTCHA}
            />
          </div>
          <div className="buttom-container">
            <button
              onClick={handlePreLogin}
              className={`confirm-buttom-${isLoginReady() ? 'enabled' : 'disabled'}`}
              >Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

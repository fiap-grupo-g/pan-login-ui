import { PASSWORD_LENGTH } from "./constants";

export const instantiatePassword = () => {
  let emptyPassword = [];

  for (let index = 0; index < PASSWORD_LENGTH; index++) {
    emptyPassword.push('');
  }

  return emptyPassword;
}

export const getNextEmptyIndex = (password) => {
  for (let index = 0; index < password.length; index++) {
    if (!password[index]) return index;
  }
  return null;
}

export const getLastFilledIndex = (password) => {
  const nextEmptyIndex = getNextEmptyIndex(password);
  if (nextEmptyIndex === null) {
    return password.length - 1;
  }
  if (nextEmptyIndex === 0) {
    return 0;
  }
  return nextEmptyIndex - 1;
}

export const hasEmptyEntry = (password) => {
  for (let index = 0; index < password.length; index++) {
    if (!password[index]) return true;
  }
  return false;
}

export const preparePassword = (password) => {
  let result = [];
  password.map(step => {
    result.push(parseInt(step.substring(0,1), 10));
    result.push(parseInt(step.substring(1,2), 10));
  });
  return result;
}

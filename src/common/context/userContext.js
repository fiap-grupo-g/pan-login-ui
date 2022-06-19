import React, { useContext, useEffect, useState } from 'react';

export const UserContext = React.createContext({
  user: {
    cpfCnpj: '', 
    password: [], 
    intentId: ''
  },
  token: {},
  username: '',
  setUser: () => {}
});

export function useUserContext() {
  return useContext(UserContext);
}

// I Justin Weiss R01918238 certify that this submission is my own origional work.
import React from 'react';

export const AuthDataContext = React.createContext();

export const useAuthData = () => {
  const authDataState = React.useState("");
  const [authData, updateAuthData] = authDataState;

  React.useEffect(() => {
    const localAuthData = localStorage.getItem('authData');
    if (localAuthData)
      updateAuthData(JSON.parse(localAuthData));
  },[]);

  React.useEffect(() => {
    if (authData)
      localStorage.setItem('authData', JSON.stringify(authData));
  },[authData]);

  return authDataState;
}

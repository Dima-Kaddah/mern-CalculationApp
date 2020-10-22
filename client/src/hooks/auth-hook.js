import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((token, expirationDate) => {
    setToken(token);
    const tokenExpiration = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpiration);
    localStorage.setItem(
      'userData',
      JSON.stringify({ token: token, expiration: tokenExpiration.toISOString() }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const reminigTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, reminigTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedToken = JSON.parse(localStorage.getItem('userData'));
    if (storedToken &&
      storedToken.token &&
      new Date(storedToken.expiration) > new Date()
    ) {
      login(storedToken.token, new Date(storedToken.expiration));
    }
  }, [login]);


  return { token, login, logout };
};
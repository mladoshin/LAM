import React, { createContext, useState, useEffect } from 'react';

const defaultState = {
  open: false,
  product: {}
};

export const NotificationContext = createContext(defaultState);

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState(defaultState);

  const showNotification = (product) => {
    setState({ ...state, open: true, product });
  };

  const closeNotification = () => {
    setState({ ...state, open: false, product: {} });
  };

  useEffect(() => {
    if (state?.open === true) {
      setTimeout(() => {
        closeNotification();
      }, 10000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <NotificationContext.Provider
      value={{
        state,
        setState,
        showNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

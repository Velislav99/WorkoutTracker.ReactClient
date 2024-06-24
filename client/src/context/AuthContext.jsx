import { createContext, useReducer, useEffect } from 'react';
import { baseUrl } from '../shared';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null 
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  useEffect(() => {
    const refreshToken = async () => {
      if (state.user && state.user.refreshToken) {
        try {
          const response = await fetch(`${baseUrl}refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken: localStorage.refreshToken }),
          });

          if (!response.ok) {
            throw new Error('Failed to refresh token');
          }

          const data = await response.json();

          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          localStorage.setItem('tokenExpiry', Date.now() + data.expiresIn * 1000);

          dispatch({ type: 'LOGIN', payload: { ...state.user, ...data } });
        } catch (error) {
          console.error('Error refreshing token:', error);
        }
      }
    };

    refreshToken();

    if (state.user) {
      const interval = setInterval(() => {
        refreshToken();
      }, (localStorage.tokenExpiry - Date.now()) / 2);

      return () => clearInterval(interval);
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
};

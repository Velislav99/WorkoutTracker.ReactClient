import { createContext, useReducer, useLayoutEffect } from 'react';
import { baseUrl } from '../shared';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { accessToken: action.payload.accessToken };
    case 'LOGOUT':
      return { accessToken: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    accessToken: null,
  });

  useLayoutEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken && !state.accessToken) {
        try {
          const response = await fetch(`${baseUrl}refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (!response.ok) {
            throw new Error('Failed to refresh token');
          }

          const data = await response.json();

          // Update access token in context
          dispatch({ type: 'LOGIN', payload: { accessToken: data.accessToken } });
        } catch (error) {
          console.error('Error refreshing token:', error);
          dispatch({ type: 'LOGOUT' });
        }
      }
    };

    refreshAccessToken();
  }, [state.accessToken, dispatch]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

import { useContext, createContext, useState, useCallback } from "react";

const AuthContext = createContext({ 
    logged: false,
});

export const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
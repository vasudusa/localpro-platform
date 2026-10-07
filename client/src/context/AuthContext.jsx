import React, {createContext, useState} from 'react'
export const AuthContext = createContext(null)
export function AuthProvider({children}){
  const [user, setUser] = useState(()=>{
    const raw = localStorage.getItem('lp_user');
    return raw ? JSON.parse(raw) : null;
  });
  function login(userObj, token){
    localStorage.setItem('lp_user', JSON.stringify(userObj));
    localStorage.setItem('lp_token', token);
    setUser(userObj);
  }
  function logout(){
    localStorage.removeItem('lp_user');
    localStorage.removeItem('lp_token');
    setUser(null);
  }
  return <AuthContext.Provider value={{user, login, logout}}>{children}</AuthContext.Provider>
}

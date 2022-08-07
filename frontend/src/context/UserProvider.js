import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const userContext = createContext();

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("task-app-user"))
      setUser(userInfo);
      if(!userInfo){
        navigate("/login")
      }
    }, [navigate])
    
    return (
        <userContext.Provider value={{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}

export const UserState = () => {
    return useContext(userContext)
}

export default UserProvider

import React, {useState,useEffect,createContext} from "react";
import API from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const {data} = await API.post("/auth/login", {email, password })
        localStorage.setItem("token", data.token)
        setUser(data.user)
    }
    const register = async (userData) => {
        await API.post("auth/registerUser", userData)
    }
    const logout = async () => {
       await API.post("/auth/logout")
        localStorage.removeItem("token")
        setUser(null)
    }
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            API.get("/auth/me")
                .then(({data}) => setUser(data))
                .catch(() => logout())
        }
    }, [])
    return(
        <AuthContext.Provider value={{user,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
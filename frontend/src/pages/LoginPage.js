import React, { useState, useContext } from 'react';
import API from "../api/api"; // Assicurati che l'API sia importata correttamente

const LoginPage = () => {
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({email,password})
    }

    const login = async ({ email, password }) => {
        try {
            const response = await API.post("/auth/login", { email, password });
            console.log("Login avvenuta con successo", response);
        } catch (error) {
            console.error("Errore durante il Login:", error);
        }
    };

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Accedi</button>
            </form>
        </div>
    );
};
export default LoginPage;
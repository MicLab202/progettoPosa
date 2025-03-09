import React, { useState } from "react";
import API from "../api/api"; // Assicurati che l'API sia importata correttamente

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await register({ email, password, name });
    };

    // Funzione di registrazione
    const register = async ({ email, password, name }) => {
        try {
            const response = await API.post("/auth/registerUser", { name, email, password });
            console.log("Registrazione avvenuta con successo", response);
        } catch (error) {
            console.error("Errore durante la registrazione:", error);
        }
    };

    return (
        <div className="form-container">
            <h1>Registrati</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <button type="submit" className="submit-button">Registrati</button>
            </form>
        </div>
    );
};

export default RegisterPage;

import React, { useContext, useState } from "react";
import API from "../api/api"; // Assicurati che l'API sia importata correttamente
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");// Stato per memorizzare l'errore in caso di utente già esistente
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await register({ email, password, name });
    };

    // Funzione di registrazione
    const register = async ({ email, password, name }) => {
        try {
            const response = await API.post("/auth/registerUser", { name, email, password });
    
            try {
                await login(email, password);
                setError('');
                navigate('/')
            } catch (error) {
                console.error("Errore durante il Login:", error);
            }
        } catch (error) {
            console.error("Errore durante la registrazione:", error);
            // Controlla se l'errore è dovuto all'utente già esistente, dovrebbe richiamare una funzione definita nel backen per vedere se l'utente esiste
            if (error.response && error.response.status === 400 && error.response.data.msg === 'utente già registrato') {
                setError("L'utente esiste già. Prova ad accedere.");
            } else {
                setError("Errore durante la registrazione. Riprova.");
            } 
        };
    };

    return (
        <div className="form-container">
            <h1>Registrati</h1>
            {/* Banda di errore in caso di utente già registrato */}
            {error && (
                <div style={{ 
                    color: "red", 
                    backgroundColor: "#ffe6e6", 
                    padding: "10px", 
                    borderRadius: "5px", 
                    marginBottom: "10px" 
                }}>
                    {error}
                </div>
            )}
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

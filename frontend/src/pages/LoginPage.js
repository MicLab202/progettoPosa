import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [error, setError] = useState(""); // Stato per gestire l'errore
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email,password)
            setError('');
            navigate("/")
        } catch (error) {
            console.error("Errore durante il Login:", error);
            setError("Email o password non corretti. riprova"); // imposta il messaggio di errore
        }
    }


    return(
        <div>
            <h1>Login</h1>
            {/* Banda di errore quando email o passowrd non sono corrwetti */}
            {error && <div style={{ color: "red", backgroundColor: "#ffe6e6", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>{error}</div>}
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
// {eror ...} mostra una banda rossa con un messaggio di errore
export default LoginPage;
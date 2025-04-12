import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            setError('');
            navigate("/");
        } catch (error) {
            console.error("Errore durante il Login:", error);
            setError("Email o password non corretti. Riprova.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h1 style={styles.title}>Login</h1>
                {error && <div style={styles.errorBox}>{error}</div>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Accedi</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
    },
    formBox: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
    },
    errorBox: {
        color: '#a10000',
        backgroundColor: '#ffe6e6',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        fontSize: '0.9rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#28a745', // Verde come il bottone Registrati
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
    },
};

export default LoginPage;

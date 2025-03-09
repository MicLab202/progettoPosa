import React, { useState, useContext } from 'react';
import {AuthContext} from "../context/AuthContext";

const LoginPage = () => {
    const {login} = useContext(AuthContext)
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email,password)
    }

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
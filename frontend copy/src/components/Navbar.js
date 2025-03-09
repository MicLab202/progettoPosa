import React, {useContext} from "react";
import {Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Navbar = () => {
    const {user,logout} = useContext(useAuth)

    return(
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                <Link to="/posts/new">Crea Post</Link>
                <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                <Link to="/login">Login</Link>
                    <Link to="/register">Registrati</Link>
                </>
            )}
        </nav>
    )
}
export default Navbar;
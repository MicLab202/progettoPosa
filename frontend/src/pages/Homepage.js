import React from "react";
import PostListPage from "./PostListPage";
import backgroundImage from './pizza-background.jpg'; //  importa l’immagine locale

const Homepage = () => {
    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <h1 style={titleStyle}>Benvenuti nella Community di Pizzaioli!!</h1>
                <PostListPage />
            </div>
        </div>
    );
};

export default Homepage;

// --- Stili in fondo per mantenere il codice JS pulito ---
const containerStyle = {
    minHeight: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
};

const contentStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "900px",
    width: "100%",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    textAlign: "center"
};

const titleStyle = {
    marginBottom: "20px"
};

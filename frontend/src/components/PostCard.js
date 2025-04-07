import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <div style={styles.card}>
            {post.img && <img src={post.img} alt="Post" style={styles.image} />}
            <div style={styles.content}>
                <h2 style={styles.title}>{post.title}</h2>
                <p style={styles.description}>{post.content}</p>
                <Link to={`/posts/${post._id}`} style={styles.link}>Leggi di più</Link>
            </div>
        </div>
    );
};

const styles = {
    card: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#000",
        border: "1px solid #ddd",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        margin: "20px",
        maxWidth: "400px",
        textAlign: "center",
        paddingBottom: "20px",
        transition: "transform 0.3s ease-in-out",
    },
    image: {
        width: "100%",
        height: "250px",
        objectFit: "cover",
        border: "20px solid black", // Bordo più grande, anche sui lati sinistro e destro
        margin: "0 20px", // Spazio a sinistra e destra
    },
    content: {
        padding: "10px",
        backgroundColor: "#000",
        color: "#fff",
        width: "90%",
        marginRight: "15px", // Spazio tra il contenuto e il bordo destro
        textAlign: "left", // Allinea il testo a sinistra
    },
    title: {
        fontSize: "1.5rem",
        margin: "5px 0",
        color: "#fff",
        order: -1, // Posiziona il titolo sopra
    },
    description: {
        fontSize: "0.9rem",
        color: "#ddd",
        lineHeight: "1.4",
        marginBottom: "10px",
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold",
        fontSize: "1rem",
    },
};

export default PostCard;

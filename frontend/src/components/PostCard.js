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
        flexDirection: "row",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        margin: "20px auto",
        maxWidth: "800px",
        width: "100%",
        height: "250px",
    },
    image: {
        width: "50%",         // Prende metà della larghezza
        height: "100%",
        objectFit: "cover",
    },
    content: {
        width: "50%",         // Anche questo prende metà
        padding: "20px",
        backgroundColor: "#fff",
        color: "#000",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
    },
    title: {
        fontSize: "1.6rem",
        margin: "0 0 10px 0",
        color: "#222",
    },
    description: {
        fontSize: "1rem",
        color: "#444",
        lineHeight: "1.5",
        flexGrow: 1,
        marginBottom: "15px",
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold",
        fontSize: "1rem",
        alignSelf: "flex-start",
    },
};

export default PostCard;

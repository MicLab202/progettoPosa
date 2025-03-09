import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
    <div className="post-card" style={styles.card}>
        <h2 style={styles.title}>{post.title}</h2>
        <p style={styles.content}>{post.content.slice(0, 100)}...</p>
        <Link to={`/posts/${post._id}`} style={styles.link}>Leggi di più</Link>
    </div>
);

const styles = {
    card: {
        margin: '1em',
        padding: '1em',
        background: 'white',
        borderRadius: '5px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '1.5em',
        marginBottom: '0.5em',
    },
    content: {
        fontSize: '1em',
        color: '#555',
    },
    link: {
        textDecoration: 'none',
        color: '#007bff',
        fontWeight: 'bold',
    }
};

export default PostCard;

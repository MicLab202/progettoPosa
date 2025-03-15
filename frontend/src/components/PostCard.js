import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <div style={styles.card}>
            {post.img && <img src={post.img} alt="Post" style={styles.image} />}
            <h2 style={styles.title}>{post.title}</h2>
            <p style={styles.content}>{post.content}</p>
            <Link to={`/posts/${post._id}`}>Leggi di più</Link>
            
        </div>
    );
};

const styles = {
    card: {
      display: "flex",
      flexDirection: "row",
      alignItems: "stretch",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      margin: "16px 0",
    },
    content: {
      flex: 1,
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    title: {
      fontSize: "1.8rem",
      margin: "0 0 12px 0",
      color: "#333",
    },
    description: {
      fontSize: "1rem",
      color: "#666",
      lineHeight: "1.6",
    },
    image: {
      width: "300px",
      objectFit: "cover",
      // Se vuoi un'altezza fissa, ad es. 100%, aggiungi:
      // height: "100%",
    },
  };

export default PostCard;

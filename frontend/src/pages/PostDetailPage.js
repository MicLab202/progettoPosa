import React, { useState, useEffect, useContext } from 'react';
import API from "../api/api";
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from "../components/CommentSection";
import { AuthContext } from "../context/AuthContext";

const PostDetailPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const { user, reloadUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await API.get(`/post/${id}`);
                setPost(data);
            } catch (e) {
                console.error('Errore nel recupero del post', e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
        reloadUser();
    }, [id, reloadUser]);

    if (loading) return <div>Caricamento...</div>;

    const handleLike = async () => {
        const response = await API.patch(`/post/${id}/like`);
        setPost(prev => ({
            ...response.data,
            author: prev.author // preserva l'autore originale(evita che il tasto elimina post venga cancellato)
        }));
    };
    
    const handleDislike = async () => {
        const response = await API.patch(`/post/${id}/dislike`);
        setPost(prev => ({
            ...response.data,
            author: prev.author // preserva l'autore originale(evita che il tasto elimina post venga cancellato)
        }));
    };
    

    const handleDeletePost = async () => {
        try {
            await API.delete(`/post/${id}`);
            navigate('/');
        } catch (e) {
            console.error("Errore nell'eliminazione del post:", e);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{post.title}</h1>

            {post.img && (
                <img
                    src={post.img}
                    alt="Post"
                    style={styles.image}
                />
            )}

            <p style={styles.content}>{post.content}</p>

            {user && (
                <div style={styles.interaction}>
                    <p>Likes: {post.likes}</p>
                    <p>Dislikes: {post.dislikes}</p>
                    <button style={buttonStyles.green} onClick={handleLike}>Like</button>
                    <button style={buttonStyles.red} onClick={handleDislike}>Dislike</button>
                </div>
            )}

            <div style={styles.commentSection}>
                <CommentSection postId={id} postAuthorId={post.author._id} />
            </div>

            {user && user._id === post.author._id && (
                <div style={styles.deleteContainer}>
                    <button style={buttonStyles.delete} onClick={handleDeletePost}>
                        Elimina Post
                    </button>
                </div>
            )}
        </div>
    );
};

// --- STILI ---
const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        position: "relative",
        display: "flex",
        flexDirection: "column"
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#333"
    },
    image: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: "8px",
        marginBottom: "20px"
    },
    content: {
        fontSize: "1.2rem",
        lineHeight: "1.6",
        color: "#555",
        marginBottom: "20px"
    },
    interaction: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "20px"
    },
    commentSection: {
        marginTop: "30px",
        padding: "15px",
        background: "#f8f9fa",
        borderRadius: "8px",
        width: "100%",
        boxSizing: "border-box"
    },
    deleteContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "30px"
    }
};

const buttonStyles = {
    green: {
        background: "#28a745",
        color: "white",
        padding: "8px 12px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s"
    },
    red: {
        background: "#dc3545",
        color: "white",
        padding: "8px 12px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s"
    },
    delete: {
        background: "#ff6b6b",
        color: "white",
        padding: "10px 16px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s"
    }
};

export default PostDetailPage;

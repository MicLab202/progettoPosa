import React, { useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId, postAuthorId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user, loading, reloadUser } = useContext(AuthContext);

    const fetchComments = async () => {
        try {
            const response = await API.get(`/comment/${postId}`);
            setComments(response.data);
        } catch (err) {
            console.error("Errore nel recupero dei commenti:", err);
        }
    };

    useEffect(() => {
        if (!loading) {
            fetchComments();
            reloadUser();
        }
    }, [postId, loading]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {
            await API.post(`/comment/${postId}`, { content: newComment });
            fetchComments();
            setNewComment('');
        } catch (err) {
            console.error("Errore nell'aggiunta del commento:", err);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await API.delete(`/comment/${commentId}`);
            fetchComments();
        } catch (err) {
            console.error("Errore nella cancellazione del commento:", err);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            <h3 style={styles.heading}>Commenti</h3>

            <div style={styles.commentList}>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} style={styles.commentBox}>
                            <p style={styles.commentText}>{comment.content}</p>
                            {user && (user._id === comment.author || user._id === postAuthorId) && (
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDeleteComment(comment._id)}
                                >
                                    Elimina
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nessun commento presente.</p>
                )}
            </div>

            {user && (
                <div style={styles.formContainer}>
                    <textarea
                        style={styles.textarea}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Scrivi un commento..."
                    />
                    <button onClick={handleAddComment} style={styles.postButton}>
                        Aggiungi commento
                    </button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    heading: {
        fontSize: "1.4rem",
        marginBottom: "10px",
        color: "#333"
    },
    commentList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },
    commentBox: {
        backgroundColor: "#f1f1f1",
        padding: "12px",
        borderRadius: "6px",
        position: "relative"
    },
    commentText: {
        margin: 0,
        color: "#333",
        fontSize: "1rem"
    },
    deleteButton: {
        position: "absolute",
        top: "10px",
        right: "10px",
        background: "#dc3545",
        color: "#fff",
        border: "none",
        padding: "4px 8px",
        borderRadius: "4px",
        cursor: "pointer"
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px"
    },
    textarea: {
        width: "100%",
        minHeight: "80px",
        padding: "10px",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        resize: "vertical"
    },
    postButton: {
        alignSelf: "flex-end",
        background: "#6c757d", // Grigio
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s"
    }
};

export default CommentSection;

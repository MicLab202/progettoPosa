import React, { useState, useEffect, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user, loading, reloadUser } = useContext(AuthContext); // Ottieni l'utente dal contesto

    // Funzione per recuperare i commenti
    const fetchComments = async () => {
        try {
            const response = await API.get(`/comment/${postId}`);
            setComments(response.data);
        } catch (err) {
            console.error("Errore nel recupero dei commenti:", err);
        }
    };

    // Carica i commenti quando `postId` cambia o quando `loading` diventa `false`
    useEffect(() => {
        if (!loading) {
            fetchComments();
            reloadUser();
        }
    }, [postId, loading]); 

    // Funzione per aggiungere un nuovo commento
    const handleAddComment = async () => {
        if (!newComment.trim()) return; // Evita di inviare commenti vuoti

        try {
            const response = await API.post(`/comment/${postId}`, { content: newComment });
            fetchComments();
            setNewComment('');
        } catch (err) {
            console.error("Errore nell'aggiunta del commento:", err);
        }
    };

    // Funzione per eliminare un commento
    const handleDeleteComment = async (commentId) => {
        try {
            await API.delete(`/comment/${commentId}`);
            fetchComments();
        } catch (err) {
            console.error("Errore nella cancellazione del commento:", err);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Mostra il caricamento se l'utente non è pronto
    }

    return (
        <div>
            <h3>Comments</h3>
            <div>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id}>
                            <p>{comment.content}</p>
                            {user && user._id === comment.author && (
                                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nessun commento presente.</p>
                )}
            </div>

            {user && (
                <>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Scrivi un commento..."
                    />
                    <button onClick={handleAddComment}>Post Comment</button>
                </>
            )}
        </div>
    );
};

export default CommentSection;

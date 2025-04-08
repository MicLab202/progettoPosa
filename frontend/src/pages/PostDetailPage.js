import React, { useState, useEffect, useContext } from 'react';
import API from "../api/api";
import { useParams } from 'react-router-dom';
import CommentSection from "../components/CommentSection";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const PostDetailPage = () => {
    const {id} = useParams();
    const [post, setPost]= useState({});
    const [loading, setLoading ] = useState(true);
    const {user, reloadUser} = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        console.log("use effect")
        const fetchPosts = async () => {
            try {
                const {data} = await API.get(`/post/${id}`);
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
        await API.patch(`/post/${id}/like`).then((response) => {
            setPost(response.data);
        });
    };
    
    const handleDislike = async () => {
        await API.patch(`/post/${id}/dislike`).then((response) => {
            setPost(response.data);
        });
    };

    const handleDeletePost = async() => {
        try{
            await API.delete(`/post/${id}`);
            navigate('/');
        } catch (e) {
            console.error("Errore nell'eliminazione del post:", e);
        }
    };

    return (
        <div style={{
            maxWidth: "800px", margin: "40px auto", padding: "20px", background: "#fff",
            borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
        }}>
            <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>{post.title}</h1>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.6", color: "#555", marginBottom: "20px" }}>{post.content}</p>
            {post.img && <img src={post.img} alt="Post" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", marginBottom: "20px" }} />}
            {user && user._id === post.author._id && (
                <button style={{ background: "#ff6b6b", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none", cursor: "pointer", fontWeight: "bold", transition: "0.3s" }}
                    onClick={handleDeletePost}>
                    Elimina Post
                </button>
            )}
            {user && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <p>Likes: {post.likes}</p>
                    <p>Dislikes: {post.dislikes}</p>
                    <button style={{ background: "#28a745", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none", cursor: "pointer", fontWeight: "bold", transition: "0.3s" }}
                        onClick={handleLike}>
                        Like
                    </button>
                    <button style={{ background: "#dc3545", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none", cursor: "pointer", fontWeight: "bold", transition: "0.3s" }}
                        onClick={handleDislike}>
                        Dislike
                    </button>
                </div>
            )}
            <div style={{ marginTop: "30px", padding: "15px", background: "#f8f9fa", borderRadius: "8px" }}>
                <CommentSection postId={id} postAuthorId={post.author._id} />
            </div>
        </div>
    );
};

export default PostDetailPage;
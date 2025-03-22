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
        const fetchPosts = async () => {
            try {
                const {data} = await API.get(`/post/${id}`);
                
                setPost(data)
            } catch (e) {
                console.error('Errore nel recupero del post', e.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts();
        reloadUser();
        
    }, []);
    if (loading) return <div>Caricamento...</div>
    const handleLike = async () => {
        await API.patch(`/post/${id}/like`).then((response) => {
            setPost(response.data)
        })
    }
    const handleDisike = async () => {
        await API.patch(`/post/${id}/dislike`).then((response) => {
            setPost(response.data)
        })
    }

    const handleDeletePost = async(id) => {
        try{
            await API.delete(`/post/${id}`);
            navigate('/')
        } catch (e) {
            console.error("Errore nell'eliminazione del post:", e)
        }
        
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.img && <img src={post.img} alt="Post" />}
            {user && user._id === post.author._id && (
                <button onClick={()=> handleDeletePost(post._id)}>
                    Delete Post
                </button>
            )}
            {user && (
                <><p>Likes: {post.likes}</p><p>Dislikes:{post.dislikes}</p><button onClick={handleLike}>Like</button><button onClick={handleDisike}>Dislike</button></>
            )}

            <CommentSection postId={id} />
        </div>
    )
}
export default PostDetailPage;
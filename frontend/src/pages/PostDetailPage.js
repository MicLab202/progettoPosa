import React, { useState, useEffect } from 'react';
import API from "../api/api";
import { useParams } from 'react-router-dom';
import CommentSection from "../components/CommentSection";

const PostDetailPage = () => {
    const {id} = useParams();
    const [post, setPost]= useState({});
    const [loading, setLoading ] = useState(true);

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

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            {post.img && <img src={post.img} alt="Post" />}
            <p>Likes: {post.likes}</p>
            <p>Dislikes:{post.dislikes}</p>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDisike}>Dislike</button>
            
        </div>
    )
}
export default PostDetailPage;
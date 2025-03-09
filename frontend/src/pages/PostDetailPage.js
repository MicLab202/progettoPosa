import React, { useState, useEffect } from 'react';
import API from "../api/api";
import { useParams } from 'react-router-dom';
import CommentSection from "../components/CommentSection";

const PostDetailPage = () => {
    const {id} = useParams();
    const [post, setPost]= useState({});

    useEffect(() => {
        try{
            API.get(`/post/${id}`).then((response) => setPost(response.data))
        }
        catch (error) {
            console.log(error.message)
        }
    }, [id]);

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
            <p>Likes: {post.likes}</p>
            <p>Dislikes:{post.dislikes}</p>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleDisike}>Dislike</button>
        </div>
    )
}
export default PostDetailPage;
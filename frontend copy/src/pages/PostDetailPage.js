import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentSection from "../components/CommentSection";

const PostDetailPage = () => {
    const {id} = useParams();
    const [post, setPost]= useState({});

    useEffect(() => {
        axios.gey(`/api/posts/${id}`).then((response) => setPost(response.data))
    }, [id]);

    const handleLike = async () => {
        await axios.patch(`/api/posts/${id}/like`).then((response) => {
            setPost(response.data)
        })
    }
    const handleDisike = async () => {
        await axios.patch(`/api/posts/${id}/dislike`).then((response) => {
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
            <CommentSection postId={id} />
        </div>
    )
}
export default PostDetailPage;
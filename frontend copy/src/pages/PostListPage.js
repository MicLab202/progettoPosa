import React, { useState, useEffect } from 'react';
import API from "../api/api";
import PostCard from "../components/PostCard"
import axios from 'axios';
import { Link } from 'react-router-dom';


const PostListPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data} = await axios.get('/api/posts');
                setPosts(data);
            } catch (e) {
                console.error('errore', e.message)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts();
    }, []);
    if (loading) return <div>Caricamento...</div>
    return(
        <div>
            {posts.map(post =>(
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <Link to={`/posts/${post._id}`}>Visualizza Dettagli</Link>
                </div>
                    ))}

        </div>
    )
            }
            export default PostListPage;

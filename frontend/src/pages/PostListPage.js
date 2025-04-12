import React, { useState, useEffect } from 'react';
import API from "../api/api";
import PostCard from "../components/PostCard"


const PostListPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const {data} = await API.get('/post');
                
                setPosts(data.reverse())
            } catch (e) {
                console.error('Errore nel recupero dei post', e.message)
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
                <PostCard key={post.id} post={post} />
                    ))}

        </div>
    )
}
export default PostListPage;
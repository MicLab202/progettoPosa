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
                
                if(data.length === 0){
                    const hardcodedPost = [
                        {
                            _id: '507f191e810c19729de860ea',
                            title: 'Primo Post Hardcoded',
                            content: 'Questo è il contenuto del primo post, hardcoded per il testing.'
                        },                        
                        {
                            _id: '507f191e810c19729de860eb',
                            title: 'Secondo Post Hardcoded',
                            content: 'Questo è il contenuto del secondo post, hardcoded per il testing.'
                        }
                    ];
                    setPosts(hardcodedPost);
                }
                else {
                    setPosts(data);

                }

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
                <PostCard key={post.id} post={post} />
                    ))}

        </div>
    )
}
export default PostListPage;

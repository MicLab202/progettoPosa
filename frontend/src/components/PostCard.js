import React from "react";
import {Link} from "react-router-dom";

const PostCard = ({post}) => (
    <div>
        <h2>{post.title}</h2>
        <p>{post.content.slice(0, 100)}...</p>
        <Link to={`/posts/${post._id}`}>Leggi di più</Link>
    </div>
)
export default PostCard;

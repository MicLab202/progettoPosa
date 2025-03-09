import React, {useState, useEffect} from "react";
import API from "../api/api";

const  CommentSection = ({postId}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        API.get(`/comment/${postId}`).then((response) => setComments(response.data))
    }, [postId])

    const handleAddComment =  () => {
       API.post(`/comment/${postId}`, { content: newComment}).then((response) => {
           setComments((prev) => [...prev, response.data])
           setNewComment('');
       })
    }
    const handleDeleteComment =  (commentId) => {
        API.delete(`/comment/${postId}/${commentId}`).then(() => {
            setComments((prev) => prev.filter((comment) => comment._id !== commentId))
            setNewComment('');
        })
    }
    return(
        <div>
        <h3>Comments</h3>
            <div>
                {comments.map((comment) => (
                    <div key={comment._id}>
                        <p>{comment.content}</p>
                        <button onClick={() => handleDeleteComment((comment._id))}>Delete</button>
                    </div>
                ))}

        </div>
            <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Scrivi un commento...">
            </textarea>
            <button onClick={handleAddComment}>Post Comment</button>
        </div>

    )
}
export default CommentSection;
import React,{useState} from "react";
import API from "../api/api";

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title)
        formData.append("content", content)
        if (image) formData.append("image", image)
        await API.post("/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        setTitle("");
        setContent("");
        setImage(null);
    }
    return(
        <form onSubmit={handleSubmit}>
            <h1>Crea un Nuovo Post</h1>
            <input
            type="text"
            placeholder="Titolo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Contenuto"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
            <button type="submit">Pubblica</button>
        </form>
    )
}
export default CreatePostPage;
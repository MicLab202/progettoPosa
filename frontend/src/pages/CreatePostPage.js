import React,{useState} from "react";
import API from "../api/api";

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!title || !content || !image) {
            console.error("Titolo, contenuto e immagine sono obbligatori");
            return;
        }
    
        let base64Image = null;
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = async () => {
                base64Image = reader.result; // Ottieni l'immagine in Base64
    
                try {
                    await API.post("/post/", {
                        title,
                        content,
                        img: base64Image, // Invia l'immagine come stringa
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
    
                    // Reset dei campi dopo l'invio
                    setTitle("");
                    setContent("");
                    setImage(null);
                } catch (error) {
                    console.error("Errore durante la creazione del post:", error);
                }
            };
    };
    
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
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Pubblica</button>
        </form>
    );
};
export default CreatePostPage;
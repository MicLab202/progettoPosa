import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !image) {
            console.error("Titolo, contenuto e immagine sono obbligatori");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
            const base64Image = reader.result;

            try {
                await API.post("/post/", {
                    title,
                    content,
                    img: base64Image,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                setTitle("");
                setContent("");
                setImage(null);
                navigate('/');
            } catch (error) {
                console.error("Errore durante la creazione del post:", error);
            }
        };
    };

    return (
        <div style={styles.container}>
            <div style={styles.formBox}>
                <h1 style={styles.title}>Crea un Nuovo Post</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Titolo"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Contenuto"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        style={styles.textarea}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Pubblica</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
        padding: '20px',
    },
    formBox: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
    },
    title: {
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    textarea: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        resize: 'vertical',
    },
    button: {
        padding: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#28a745',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
    },
};

export default CreatePostPage;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import PostDetailPage from "./pages/PostDetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreatePostPage from "./pages/CreatePostPage";


const App = () => (
        <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/posts/:id" element={<PostDetailPage />} />
                    <Route path="/posts/new" element={<CreatePostPage />} />
                </Routes>
        </Router>
);
export default App;
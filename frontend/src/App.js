import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import RegisterPage from "./pages/RegisterPage";
import PostDetailPage from "./pages/PostDetailPage"; 
import CreatePostPage from "./pages/CreatePostPage";
import Homepage from "./pages/Homepage";

const App = () => (
    <AuthProvider>
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<PostListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/posts/:id" element={<PostDetailPage />} />
                <Route path="/posts/new" element={<CreatePostPage />} />
                <Route path="/" element={<Homepage />} />
            </Routes>
        </Router>
    </AuthProvider>
);
export default App;
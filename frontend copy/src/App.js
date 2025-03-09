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
    <Router>
        <Routes>
            <Route path="/" element={<Homepage />} />
        </Routes>
    </Router>
);
export default App;
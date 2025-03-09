import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";

const App = () => (
        <Router>
            <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
        </Router>
);
export default App;
import React from "react";
import Navbar from "../components/Navbar";
import PostListPage from "./PostListPage";

const Homepage = () => {
    return(
        <div>
            <Navbar />
            <h1>Benvenuti nella Community di Pizzaioli!!</h1>
            <PostListPage/>
        </div>
    )
}
export default Homepage;

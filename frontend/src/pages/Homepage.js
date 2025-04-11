import React from "react";
import PostListPage from "./PostListPage";

const Homepage = () => {
    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <h1>Benvenuti nella Community di Pizzaioli!!</h1>
            <PostListPage/>
        </div>
    )
}
export default Homepage;

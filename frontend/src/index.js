import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AuthProvider } from './context/AuthContext.js'

/* modifica sufferita dalla console ma non necessaria */

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

/* modifica sufferita dalla console ma non necessaria 

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./context/AuthContext.js";

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);

*/

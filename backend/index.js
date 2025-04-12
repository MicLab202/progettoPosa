const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Carica le variabili di ambiente
dotenv.config();

const app = express();

// Funzione di connessione al database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mikelelabar:ferrara@cluster0.94sr5.mongodb.net/Database_foto', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connessione a MongoDB riuscita");
    } catch (error) {
        console.log("Connessione con MongoDB non riuscita", error);
        process.exit(1);
    }
}

// Configura CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Cambia con il dominio del frontend
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));  // Applica CORS prima di tutte le route
app.use(express.json({limit: "100mb"}));     // Middleware per il parsing del corpo della richiesta (JSON)
app.use(cookieParser());     // Middleware per i cookie
app.use(express.urlencoded({ extended: true })); // Middleware per il parsing dei form URL-encoded

// Gestore degli errori
app.use(require('./middleware/errorHandler'));

// Importa e usa le route
const authRoutes = require('./routes/auth');
const commentRoutes = require('./routes/comment');
const postRoutes = require('./routes/post');

app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comment', commentRoutes);

// Connetti al database MongoDB
connectDB();

// Avvia il server
app.listen(3001, "0.0.0.0", () => {
    console.log("Server is running on 0.0.0.0:3001");
});

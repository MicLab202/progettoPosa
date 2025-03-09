const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();


mongoose.connect('mongodb+srv://mikelelabar:ferrara@cluster0.94sr5.mongodb.net/Database_foto')

const corsOptions = {
    origin: 'http://192.168.125.129:3000', // Cambia con il dominio del frontend
    credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended:true}));
app.use(cors());

app.use(require('./middleware/errorHandler'));
app.use(cors(corsOptions));
const authRoutes= require('./routes/auth');
const commentRoutes= require('./routes/comment');
const postRoutes = require('./routes/post');


app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/comment', commentRoutes);


app.listen(3001, "0.0.0.0", () => {
    console.log("Server is running on 0.0.0.0:3001");
});



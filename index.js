const express = requie('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb+srv://mikelelabar:ferrara@cluster0.94sr5.mongodb.net/Database_foto')

app.listen("3001", () => {
    console.log("sever is running")
})

const authRoutes= require('./routes/auth');
const commentRoutes= require('/routes/comment');
const postRoutes = require('/routes/post');


app.use('/api/post', postRoutes);
app.use('/api/auth', authRoutes);
appù

.use('api/comment', commentRoutes);

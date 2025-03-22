const Post = require('../models/PostModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');


// creazione del post passando titolo e immagine in input
const createPost = async (req, res) => {
    const{title, content, img } = req.body;
    const userId = req.user.id;
    try {
        const post = new Post ({
            title,
            content,
            author: userId,
            img,
        })
        await post.save();
        res.status(200).json({msg:'post creato con successo', post: post});
    } catch (e){
        res.status(500).json({ msg:'error', error: e})
    }
}


const getPost = async (req,res) => {
    try {
        const posts = await Post.find().populate('author', 'name');
        res.status(200).json(posts)
    } catch (e) {
        res.status(500).json({msg:'error', error: e})
    }
}


const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        // Esegui il cast dell'ID in ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid ID format' });
        }

        const post = await Post.findById(id).populate('author', 'name');
        
        if (!post) {
            return res.status(400).json({ msg: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({ msg: 'Error', error: e.message });
    }
};



const updatePost = async (req, res) => {
    const {id} = req.params
    const {title, content} = req.body
    try{
        const post = await Post.findById(id) // ricerca del post
        if(!post){
            return res.status(400).json({ msg : 'post not found'})
        }
        if (post.author.toString() !== req.user.id) {  // verifica se il post trovato ha lo stesso idutente dell'utente che sta provando a modfificarlo
            return res.status(400).json({ msg : 'Non è possibile modificare questo post'})
        }
        post.title = title || post.title
        post.content = content || post.content
        await post.save()
        res.status(200).json(posts)
    } catch (e) {
        res.status(500).json({msg:'error', error: e})
    }
}


const deletePost = async (req,res) => {
    const {id} = req.params
    const user = req.user
    try{
        if(!user) {
            res.status(400).json({ msg: 'User not Valid' });
        }
        const post = await Post.findByIdAndDelete(id)
        if (!post) {res.status(400).json({ msg: 'post not found' });
        }
        res.status(200).json({msg: 'post deleted'})
    } catch (e) {
        res.status(500).json({msg:'error', error: e })
    }
}


// tecnicamente, facendo così un utente puo mettere tanti like, bisogna trovare un modo per evitarlo
const likePost = async (req,res) => {
    const {id} = req.params
    const userId = req.user.id
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(400).json({msg:'post not found'})
        }
        if (post.likedBy.includes(userId)) {
            return res.status(400).json({msg: 'Hai già messo Like a questo post'})
        }

        if (post.dislikedBy.includes(userId)){
            post.dislikes -=1;
            post.dislikedBy = post.dislikedBy.filter(user => user.toString() !== userId);
        }

        post.likes += 1;
        post.likedBy.push(userId);
        await post.save()
        res.status(200).json(post)
    } catch (e) {
        res.status(500).json({msg:'error', error: e})
    }
}


// stesso problema dei like
const dislikePost = async (req,res) => {
    const {id} = req.params
    const userId = req.user.id
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(400).json({msg:'post not found'})
        }
        
        if (post.dislikedBy.includes(userId)) {
            return res.status(400).json({msg: 'Hai già messo Disike a questo post'})
        }

        if (post.likedBy.includes(userId)){
            post.likes -=1 ;
            post.likedBy = post.likedBy.filter(user => user.toString() !== userId);
        }
        post.dislikes += 1
        post.dislikedBy.push(userId);
        await post.save()
        res.status(200).json(post)
    } catch (e) {
        res.status(500).json({msg:'error', error: e})
    }
}


module.exports = {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    dislikePost
}
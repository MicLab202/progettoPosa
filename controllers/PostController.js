const Post = require('../models/PostModel');
const User = require('../models/userModel');


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
    const {id} = req.params;
    try {
        const post = await Post.findById(id).populate('author', 'name')
        if(!post){
            return res.status(400).json({ msg : 'post not found'})
        } 
        res.status(200).json(post)
    } catch (e) {
        res.status(500).json({msg:'error', error: e})

    }
}



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
    try{
        const post = await Post.findById(id)
        if (!post) {res.status(400).json({ msg: 'post not found' });

        }
        if(post.author.toString() !== req.user.id) {
            return res.status(400).json({msg:'post not found'})
        }
        await post.remove()
        res.status(200).json({msg: 'post eliminato'})
    } catch (e) {
        res.status(500).json({msg:'error', error: e })
    }
}


// tecnicamente, facendo così un utente puo mettere tanti like, bisogna trovare un modo per evitarlo
const likePost = async (req,res) => {
    const {id} = req.params
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(400).json({msg:'post not found'})
        }
        post.likes += 1
        await post.save()
        res.status(200).json(post)
    } catch (e) {
        res.status(500).json({msg:'error', error: e})
    }
}


// stesso problema dei like
const dislikePost = async (req,res) => {
    const {id} = req.params
    try{
        const post = await Post.findById(id)
        if(!post){
            return res.status(400).json({msg:'post not found'})
        }
        post.dislikes += 1
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
const express = require('express');
const{createPost, getPost, getPostById, 
    updatePost, deletePost, likePost, dislikePost} = require('../controllers/PostController')


const router = express.Router();
router.get('/',getPost )
router.get('/:id',getPostById )
router.post('/',  createPost)
router.put('/:id',  updatePost)
router.delete('/', deletePost)
router.patch('/like',  likePost)
router.patch('/dislike',dislikePost)

module.exports = router
//ricorda di vedere quella cosa del middleware
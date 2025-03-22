const express = require('express');
const{createPost, getPost, getPostById, 
    updatePost, deletePost, likePost, dislikePost} = require('../controllers/PostController')
const authMiddleware = require('../middleware/authMiddleware.js');



const router = express.Router();
router.get('/',getPost )
router.get('/:id',getPostById )
router.post('/', authMiddleware,  createPost)
router.put('/:id',  updatePost)
router.delete('/:id', authMiddleware, deletePost)
router.patch('/:id/like', authMiddleware,  likePost)
router.patch('/:id/dislike',authMiddleware, dislikePost)

module.exports = router
//ricorda di vedere quella cosa del middleware
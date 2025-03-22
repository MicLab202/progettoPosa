const express = require('express');
const {addComment, deleteComment, retrieveCommentByPostId} = require('../controllers/CommentContoller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id', authMiddleware, addComment)
router.delete('/:id',authMiddleware, deleteComment)
router.get('/:id', retrieveCommentByPostId)

module.exports = router;
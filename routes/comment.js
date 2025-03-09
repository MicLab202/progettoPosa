const express = require('express');
const {addComment, deleteComment} = require('../controllers/CommentContoller');
const router = express.Router();

router.post('/', addComment)
router.delete('/delete', deleteComment)

module.exports = router;
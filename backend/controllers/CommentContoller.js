const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');
const mongoose = require('mongoose');

// passa in input un post, sul quale poi posso inserire un commento

const addComment = async (req,res) => {
    const {id} = req.params
    const {content} = req.body
    const userId = req.user.id;


    // Controllo che l'utente sia autenticato
    if (!req.user) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    // Validazione del contenuto
    if (!content || content.trim() === '') {
        return res.status(400).json({ msg: 'Comment content is required' });
    }


    try{

        const post = await Post.findById(id)  
        if(!post){
            return res.status(400).json({msg:'post not founded'})
        }
        
        // crea un nuovo commento associato al post e all'autore
        const comment = new Comment({
            content,
            author: userId,
            post: id               // è l'id del post dove si trova
        })

        await comment.save()

        // aggiunto del commento al post
        post.comments.push(comment._id)
        await post.save()

        return res.status(200).json({ msg: 'Commento inserito' });

    } catch (e) {
        res.status(500).json({msg:'error', error : e})
    }
}

// passo in input un commento, dal quale poi prendo il su commentid e l'id del post sul quale si trova(che si trova nel model del commento)

const deleteComment = async (req,res) => {
    const {id} = req.params
    try{
        const comment = await Comment.findByIdAndDelete(id) 

        if(!comment) 
            return res.status(400).json({msg:'commento non trovato'})

        const post = comment.post;

        await Post.findByIdAndUpdate(post, {
            $pull : {comments : id},
        })

        res.status(200).json({ msg :'commento eliminato'})
    } catch (e) {
        res.status(500).json({msg:'error', error : e.message})
    }
}

const retrieveCommentByPostId = async(req,res) => {
    const {id} = req.params;
    try{
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: 'Invalid ID format' });
        }

        const comments = await Comment.find({ post: id});

        if(!comments) {
            return res.status(400).json({ msg: 'Comments not found' });
        }
        res.status(200).json(comments);
    } catch(e) {
        res.status(500).json({ msg: "Error", error: e.message})
    }
}


module.exports = {
    addComment,
    deleteComment,
    retrieveCommentByPostId
}
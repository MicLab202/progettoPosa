const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');

// passa in input un post, sul quale poi posso inserire un commento

const addComment = async (req,res) => {
    const {id} = req.params
    const {content} = req.body


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
            author: req.user.id,
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
    const { id, commentId } = req.params

    try{
        const comment = await Comment.findById(commentId) 

        if(!comment) 
            return res.status(400).json({msg:'commento non trovato'})

        
        if (comment.author.toString() !== req.user.id ) {        // se l'utente che sta provando a cancellare il commento non è lo stesso che l'ha scritto, invia un messaggio di errore
            return res.status(400).json({msg:'error'})
        }

       await comment.remove()  // rimozione commento

        await Post.findByIdAndUpdate(id, {
            $pull : {comments : commentId},
        })

        res.status(200).json({ msg :'commento eliminato'})
    } catch (e) {
        res.status(500).json({msg:'error', error : e})
    }
}



module.exports = {
    addComment,
    deleteComment
}
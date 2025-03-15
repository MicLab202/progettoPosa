const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
    img : { type: String, default : ''},
    title : { type : String, require : true},
    content : { type: String, require: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true},
    likes :{ type: Number, default: 0},
    dislikes :{ type: Number, default: 0},
    likedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    dislikedBy: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    comments : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
}, { timestamps: true});


module.exports= mongoose.model ('Post', postSchema)

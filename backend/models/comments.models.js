
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = require('./post.models')
const User = require('./user.models')



const CommentSchema = new Schema(
    {
        postId: {
            type: mongoose.Types.ObjectId,
            ref: "Post",
            default: null,
        },
        comment: {
            type: String,
            required: true,
            index: true
        },
        commentedBy: {

            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            name: {
                type: String,
                required: true
            },
            avatar: {
                type: String,
                required: true
            }

        },


    },
    { timestamps: true }
);


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
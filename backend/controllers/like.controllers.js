const Like = require('../models/like.models');
const Post = require('../models/post.models');

const likeDislikePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(400).json({ msg: "Post not found" });
        }

        const user = req.user;
        console.log(user);

        const like = await Like.findOne({ postId: postId, likedBy: req.user._id });

        if (!like) {
            const newLike = await Like.create({
                postId: postId,
                likedBy: req.user._id
            });
            await newLike.save();


            post.likes = post.likes || [];
            if (!post.likes.includes(req.user._id)) {
                post.likes.push(req.user._id);
                await post.save();
            }

            return res.status(201).json({ msg: "Post liked", like: newLike });
        } else {
            await Like.findByIdAndDelete(like._id);


            post.likes = post.likes || [];
            if (post.likes.includes(req.user._id)) {
                post.likes.pull(req.user._id);
                await post.save();
            }

            return res.status(201).json({ msg: "Post disliked" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    likeDislikePost
};
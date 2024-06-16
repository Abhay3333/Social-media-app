const Post = require('../models/post.models');
const User = require('../models/user.models');

const createPost = async (req, res) => {
    const { content, tags } = req.body;

    try {

        const author = req.user._id;
        console.log(author);

        const post = await new Post({
            content,
            author: {
                id: author,
                name: req.user.username,
                avatar: req.user.avatar.url
            }
        })
        await post.save();

        if (!post) {
            return res.status(400).json({ msg: "Post not created" })
        }

        res.status(201).json({ post: post, mssg: "new post created" })

    } catch (error) {

        res.status(500).json({ error: error.message })
        console.log(error);
    }
}

const getPosts = async (req, res) => {
    try {
        // Get newer posts first and populate the 'author' field
        const posts = await Post.find().sort({ createdAt: -1 }).populate('author');

        // Filter out posts whose author doesn't exist in the users database
        const validPosts = posts.filter(post => post.author && post.author.id);
        const numberOfPosts = validPosts.length;

        res.status(200).json({ posts: validPosts, mssg: "Posts fetched successfully", qty: numberOfPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}



const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(id)
        const post = await Post.findById(id);
        if (!post) {
            return res.status(400).json({ msg: "Post not found" })
        }
        res.status(200).json({ post: post, mssg: "post fetched succesfully" })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        const user = req.user._id;

        if (!post) {
            res.status(200).json({ mssg: 'no post with this id' });
        }

        if (post.author.id.toString() !== user.toString()) {
            return res.status(401).json({ mssg: "you are not authorized to delete this post" })
        }
        const deletePost = await Post.findByIdAndDelete(id);

        res.status(200).json({ mssg: "post deleted succes" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);

    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        const post = await Post.findById(id);
        const user = req.user._id;

        if (!post) {
            res.status(200).json({ mssg: 'no post with this id' });
        }

        if (post.author.id.toString() !== user.toString()) {
            return res.status(401).json({ mssg: "you are not authorized to delete this post" })
        }

        post.content = content;

        await post.save();

        res.status(200).json({ post: post, mssg: "post updated succesfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(error);

    }

}


const getPostByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ msg: "user not found" });
        }

        const posts = await Post.find({ "author.id": userId })
            .sort({ createdAt: -1 })
            .populate("author", "-password");

        const numberOfPosts = posts.length;

        res.status(200).json({ posts: posts, mssg: "posts fetched successfully", qty: numberOfPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};


const savedPost = async (req, res) => {
    const { postID } = req.params;
    try {
        const post = await Post.findById(postID);
        const user = req.user._id;

        if (!post) {
            return res.status(400).json({ mssg: "post not found" })
        }

        //check if the user has already saved the post
        const isSaved = post.savedBy.includes(user);
        //if yes then remove the user from the saved post
        if (isSaved) {
            post.savedBy.pull(user);
            await post.save();
            return res.status(200).json({ mssg: "post unsaved succesfully", post: post })
        } else {
            post.savedBy.push(user);
            await post.save()
            res.status(200).json({ mssg: "post saved succesfully", post: post })
        }


    } catch (error) {

        res.status(500).json({ error: error });
        console.log(error)
    }
}

const getSavedPost = async (req, res) => {
    try {
        const userID = req.user._id;

        const post = await Post.find({ savedBy: userID });

        if (!post) {
            return res.status(401).json({ "mssg": "you have not saved the post" })
        }
        res.status(200).json({ mssg: "saved post fetched succesfully!! ", savedPost: post })

    } catch (error) {
        res.status(500).json({ mssg: "Savedpost fetched failed!!" })
        console.log("Error in getting Savedposts ", error)
    }
}


module.exports = {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    getPostByUserId,
    updatePost,
    savedPost,
    getSavedPost
}
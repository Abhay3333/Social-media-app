const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Post } = require('../models/post.models')

const avatarUrls = [
    "https://gravatar.com/avatar/ec1e4b6ce9dee173d688d4d768dbc689?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/8911e12b857cb92f2f5adb25ca3984cd?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/5cf8c28dc05602cfa427edec1daa9078?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/b4a76c0d510ff18f2314217496e9ac06?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/96b20fa3b45d666270ebb65343e70685?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/a3335ae1dcdd8e3f1c3f0ab0ab29ce43?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/5dbdc68493afd9d3ce1d0c8095bd4522?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/04f82be049ad7827918a473a0a1f4b18?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/8359bc321af885243c785f637b57289d?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/a4411051c7bcab0e000969c04dade163?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/301aa173b92f02219ed289f9c3d6798d?s=400&d=robohash&r=x",
    "https://gravatar.com/avatar/80404d218d22e6bf6655ea007280605c?s=400&d=robohash&r=x"

];



const userSchema = new mongoose.Schema(
    {
        avatar: {
            type: {
                url: String,
                localPath: String,
            },
            default: {
                url: "",
                localPath: "avatars/default-avatar.png",
            }
        },
        email:{
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            lowercase: true,
            index: true,

        },
        bio: {
            type: String,
            default: "No bio..."

        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [8, 'Password must be at least 8 characters long'],

        },
        isVerified : {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
        },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
       
    },
    { timestamps: true }
)

userSchema.methods.isPasswordValid = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    const randomIndex = Math.floor(Math.random() * avatarUrls.length);
    const randomAvatarUrl = avatarUrls[randomIndex];
    user.avatar.url = randomAvatarUrl;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    })
})


userSchema.pre('remove', async function (next) {
    const user = this;

    // Assuming you have a separate schema for posts named "Post"
    await Post.deleteMany({ user: user._id });

    next();
});





const User = mongoose.model("User", userSchema);
module.exports = User;
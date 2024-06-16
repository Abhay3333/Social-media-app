const Router = require('express')
const router = Router()


const { createPost, getPosts, getPostById, deletePost, getPostByUserId, updatePost, savedPost, getSavedPost } = require('../controllers/post.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')


router.post('/createpost', verifyJWT, createPost)
router.get('/getposts', verifyJWT, getPosts)
router.get('/getpost/:id', verifyJWT, getPostById)
router.delete('/deletepost/:id', verifyJWT, deletePost)
router.put('/updatepost/:id', verifyJWT, updatePost)
router.get('/getpostsById/:userId', verifyJWT, getPostByUserId)
router.post('/savedPost/:postID', verifyJWT, savedPost);
router.get('/getsavedpost', verifyJWT, getSavedPost)



module.exports = router;
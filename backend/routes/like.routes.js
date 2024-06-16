const Router = require('express')
const router = Router()

const { likeDislikePost } = require('../controllers/like.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')

router.post('/likeDislikePost/:postId', verifyJWT, likeDislikePost)



module.exports = router;
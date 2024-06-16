const Router = require('express')
const router = Router()

const { registerUser, loginUser, updateavatar, userInfo, userProfile, userFollowUnfollow, editProfile, verifyemail } = require('../controllers/user.controllers')
const { verifyJWT } = require('../middleware/auth.middleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/updateavatar/:userId', updateavatar)
router.get('/userinfo', verifyJWT, userInfo)
router.get('/userprofile/:userID', verifyJWT, userProfile)
router.put('/userfollowunfollow/:followUserID', verifyJWT, userFollowUnfollow)
router.put('/editprofile', verifyJWT, editProfile)
router.route('/emailverify/:tokenId').get(verifyemail);


module.exports = router;
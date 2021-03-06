const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const passport = require('../../passport')

//Matches with /api/users
router.route("/")
    .post(usersController.create);

// Matches with "/api/users/:name"
router
    .route("/:username")
    .get(usersController.findByUsername)
    .put(usersController.update)
    .delete(usersController.remove);

//Matches with /api/users/login"
router.post(
    '/login',
    function (req, res, next) {
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
        var userInfo = {
            username: req.user.username,
            _id: req.user._id
        };
        res.send(userInfo);
    }
)

//This route is used to get the basic user info
router.get('/', (req, res, next) => {
    if (req.user) {
        res.json({
            user: req.user
        })
    } else {
        res.json({
            user: null
        })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({
            msg: 'logging out'
        })
    } else {
        res.send({
            msg: 'no user to log out'
        })
    }
})

module.exports = router;
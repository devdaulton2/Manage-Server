let router = require('express').Router();
let { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

router.post('/signup', function (req, res)
{
    User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        accessCode: req.body.accessCode,
        // isAdmin: req.body.isAdmin,
        password: bcrypt.hashSync(req.body.password, 13)
    })
    .then(
        function createSuccessful(user) {
            let token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            let id= user.id;
            
            res.json({
                user: user,
                message: 'User successfully created',
                sessionToken: token,
                ID: id
            });
        }
    )
    .catch(err => res.status(500).json({ error: err }))
});

router.post('/signin', function(req, res) {

    User.findOne(
        {where:{
            email: req.body.email
        }
    })
    .then(function loginSuccess(user) {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, matches) {
                if (matches) {

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24 })
            let id = user.id

            res.status(200).json({
                user: user,
                message: "User successfully logged in!",
                sessionToken: token,
                ID: id
            })
        } else {
            res.status(502).send({error: "Login Failed"});
        }
        });
    } else {
            res.status(500).json({ error: "User does not exist."})
        }
    })
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router
let router = require('express').Router();
let { Comment } = require("../models");
let validateSession = require("../middleware/validate-session");

router.post("/create", validateSession, function(req, res) {
    const commentEntry = {
      comment: req.body.comment.comment,
      taskId: req.body.comment.taskId,
      userId: req.user.id
    };
    Comment.create(commentEntry)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({error: err})) 
});

router.get("/", validateSession, function (req, res) {
    console.log('hey')
})

  router.delete('/:id', validateSession, function (req, res) {
    const query = {where: { id: req.params.id, userId: req.user.id}};

    Comment.destroy(query)
    .then(() => res.status(200).json({message: "Comment has been removed"}))
    .catch((err) => res.status(500).json({error: err}))
})

router.put('/update/:id', validateSession, function (req, res)
{
  const updateComment = {
    userId: req.user.id,
    comment: req.body.comment.comment
  };
  
  const query = { where: { id: req.params.id, userId: req.user.id} };
  Comment.update(updateComment, query)
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err }));  
});

module.exports = router;
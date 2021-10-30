let express = require('express');
let router = express.Router();
let Task = require('../db').import('../models/taskmodel');
let validateSession = require('../Middleware/validate-session');

router.get("/", (req, res) => {
    Task.findAll()
      .then(tasks => res.status(200).json(tasks))
      .catch(err => res.status(500).json({ error: err }));
  });

router.delete('/:id', validateSession, function (req, res) {
    const query = {where: { id: req.params.id, owner_id: req.user.id}};

    Task.destroy(query)
    .then(() => res.status(200).json({message: "Upload has been removed"}))
    .catch((err) => res.status(500).json({error: err}))
})

router.post('/task', validateSession, (req, res) => {
  const taskEntry = {
      userId: req.user.id,
      type: req.body.task.type,
      subType: req.body.task.subType,
      details: req.body.task.details,
      expectedSol: req.body.task.expectedSol,
      dueDate: req.body.task.dueDate,
      solved: req.body.task.solved,
      solutionDetails: req.body.task.solutionDetails,
      owner_id: req.user.id
  }
  Task.create(taskEntry)
    .then(task => res.status(200).json(task))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/mine', validateSession, (req, res) => {
    let userid = req.user.id
    Task.findAll({
        where: { owner_id: userid }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
})

router.put('/update/:id', validateSession, function (req, res)
{
  const updateTask = {
    userId: req.user.id,
    type: req.body.task.type,
    subType: req.body.task.subType,
    details: req.body.task.details,
    expectedSol: req.body.task.expectedSol,
    dueDate: req.body.task.dueDate,
    solved: req.body.task.solved,
    solutionDetails: req.body.task.solutionDetails,
    owner_id: req.user.id
  };

  
  const query = { where: { id: req.params.id, owner_id: req.user.id} };
  Task.update(updateTask, query)
    .then((tasks) => res.status(200).json(tasks))
    .catch((err) => res.status(500).json({ error: err }));  
});

// router.put('/updatelikes/:id', function (req, res) {
//   const updateLikes = {
//     likes: req.body.task.likes
//   };
  
//   const query = { where: { id: req.params.id, owner_id: req.params.id} };
//   Task.update(updateLikes, query)
//     .then((tasks) => res.status(200).json(tasks))
//     .catch((err) => res.status(500).json({ error: err }));  
// });


module.exports = router
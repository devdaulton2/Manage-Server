let router = require('express').Router();
let {Task} = require("../models")
let validateSession = require('../middleware/validate-session');

router.get("/all", (req, res) => {
    Task.findAll()
      .then(tasks => 
        // {
        // if (tasks > 0) 
        res.status(200).json(tasks)
      // }
      )
      .catch(err => res.status(500).json({ error: err }));
  });

  router.get("/:id", (req, res) => {
    Task.findOne()
      .then(tasks => res.status(200).json(tasks))
      .catch(err => res.status(500).json({ error: err }));
  });

router.delete('/delete/:id', validateSession, function (req, res) {
    const query = {where: { id: req.params.id, userId: req.user.id}};

    Task.destroy(query)
    .then(() => res.status(200).json({message: "Upload has been removed"}))
    .catch((err) => res.status(500).json({error: err}))
})

router.post('/create', validateSession, (req, res) => {
  const taskEntry = {
      type: req.body.task.type,
      subType: req.body.task.subType,
      details: req.body.task.details,
      expectedSol: req.body.task.expectedSol,
      dueDate: req.body.task.dueDate,
      solved: req.body.task.solved,
      solutionDetails: req.body.task.solutionDetails,
      userId: req.user.id
  }
  Task.create(taskEntry)
    .then(task => res.status(200).json(task))
    .catch(err => res.status(500).json({ error: err }))
})

router.get('/mine', validateSession, (req, res) => {
    let userId = req.user.id
    Task.findAll({
        where: { userId: userId }
    })
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({ error: err }))
})


router.put('/update/:id', validateSession, function (req, res)
{
  const updateTask = {
    type: req.body.task.type,
    subType: req.body.task.subType,
    details: req.body.task.details,
    expectedSol: req.body.task.expectedSol,
    dueDate: req.body.task.dueDate,
    solved: req.body.task.solved,
    solutionDetails: req.body.task.solutionDetails,
    userId: req.user.id
  };

  
  const query = { where: { id: req.params.id, userId: req.user.id} };
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
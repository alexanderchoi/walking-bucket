const express = require('express');
const router = express.Router();

const Log = require('../../models/Log');

// @route  GET api/logs
// @desc   GET All Logs
// @access Public
router.get('/', (req, res) => {
  Log.find()
    .sort({ date: -1 })
    .then(logs => res.json(logs))
});

// @route  POST api/
// @route  DELETE api/logs/:id
// @desc   Delete A Log
// @access Public
router.delete('/:id', (req, res) => {
  Log.findById(req.params.id)
    .then(log => log.remove()
    .then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
});

// @desc   Create A Log
// @access Public
router.post('/', (req, res) => {
  const newLog = new Log({
    shotType: req.body.shotType,
    makes: req.body.makes,
    attempts: req.body.attempts
  });

  newLog.save()
    .then(log => res.json(log));
});

module.exports = router;
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const {requireAuth} = require('../middlewares/middleware');

const Athlete = mongoose.model('Athlete');

router.get('/api/athletes',  async (req, res) => {
    const athletes = await Athlete.find();
    res.send(athletes);
});

//add a new athlete
router.get('/api/athletes/new', requireAuth, (req, res) => {

});

//add a new athlete
router.post('/api/athletes', requireAuth, (req, res) => {
});

router.get('/api/athletes/:id', requireAuth, async (req, res) => {
    const athlete = await Athlete.findById(req.params.id);
    res.send(athlete)
});

router.get('/api/athletes/:id/edit', requireAuth, async (req, res) => {
    const athlete = await Athlete.findById(req.params.id)
    res.send(athlete)
});

router.put('/api/athletes/:id', requireAuth, async (req, res) => {
    const {id, user} = req.params
    await Athlete.findByIdAndUpdate(id, user)
});

router.delete('/api/athlete/:id', requireAuth, async (req, res) => {
    await Athlete.findByIdAndDelete(req.params.id)
});

module.exports = router;

const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const {requireAuth} = require('../middlewares/middleware');

const Athlete = mongoose.model('Athlete');

router.get('/api/athletes', requireAuth, async (req, res) => {
    const athletes = await Athlete.find();
    res.send(athletes);
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
    const {name, _trainer} = req.body
    const updateAthlete = {name, _trainer}

    if (name || _trainer)
        await Athlete.findByIdAndUpdate(req.params.id, updateAthlete, {}, (err, athlete) => {
            if (err)
                return res.status(400).json({errors: 'Something went wrong!0'});

            res.send(athlete)
        })

});

router.delete('/api/athlete/:id', requireAuth, async (req, res) => {
    await Athlete.findByIdAndDelete(req.params.id)
});

module.exports = router;

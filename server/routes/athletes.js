const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const {celebrate} = require('celebrate');

const {requireAuth} = require('../middlewares/middleware');
const {athleteUpdateSchema, guid} = require('../schemas/joi');
const Athlete = mongoose.model('Athlete');

router.get('/api/athletes',
    requireAuth,
    async (req, res) => {
        const athletes = await Athlete.find();
        res.send(athletes);
    });

router.get('/api/athletes/:id',
    requireAuth,
    celebrate(guid),
    async (req, res) => {
        const athlete = await Athlete.findById(req.params.id);
        res.send(athlete)
    });

router.get('/api/athletes/:id/edit',
    requireAuth,
    celebrate(guid),
    async (req, res) => {
        const athlete = await Athlete.findById(req.params.id)
        res.send(athlete)
    });

router.put('/api/athletes/:id',
    requireAuth,
    celebrate(athleteUpdateSchema, guid),
    async (req, res) => {
        const {name, _trainer} = req.body
        await Athlete.findByIdAndUpdate(req.params.id, {name, _trainer}, {}, (err, athlete) => {
            if (err)
                return res.status(400).json({errors: 'Something went wrong!'});

            res.send(athlete)
        })
    });

router.delete('/api/athlete/:id',
    requireAuth,
    celebrate(guid),
    async (req, res) => {
        await Athlete.findByIdAndDelete(req.params.id)
    });

module.exports = router;

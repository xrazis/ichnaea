const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {celebrate} = require('celebrate');

const {requireAuth} = require('../middlewares/middleware');
const Athlete = mongoose.model('Athlete');
const {influx_bucket} = require('../config/keys');
const {iQuery} = require('../actions/influx_actions');
const {guid} = require('../schemas/joi');

router.get('/api/data',
    requireAuth,
    async (req, res) => {
        const query = `from(bucket: "${influx_bucket}") |> range(start: -1h)`;
        const data = await iQuery(query);

        res.send(data);
    });

router.get('/api/data/:id',
    requireAuth,
    celebrate(guid),
    async (req, res) => {
        const athlete = await Athlete.findById(req.params.id);

        const query = `from(bucket: "${influx_bucket}") |> range(start: -1h) |> filter(fn: (r) => r.client == "${athlete.id}")`;
        const data = await iQuery(query);

        res.send(data);
    });


module.exports = router;

const express = require('express')
const router = express.Router();
const {requireAuth} = require('../middlewares/middleware');

router.get('/yoda', requireAuth, (req, res) => {
    res.send('Become powerful you have, the dark side in you I sense. Yrsssss.');
})

module.exports = router;

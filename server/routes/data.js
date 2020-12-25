const express = require('express'),
    router = express.Router();

router.get('/yoda', (req, res) => {
    res.send('Become powerful you have, the dark side in you I sense. Yrsssss.');
})

module.exports = router;

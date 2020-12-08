const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World')
})

module.exports = router;

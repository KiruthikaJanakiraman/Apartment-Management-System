// routes/api/house.js

const express = require('express');
const router = express.Router();


// @route GET api/house/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

module.exports = router;
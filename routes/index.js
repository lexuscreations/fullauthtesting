const router = require('express').Router();

router.use('/v1/user', require('./userRoutes'));

module.exports = router;

const express = require('express');
const router = express.Router();
const authRouter = require('./auth.routes');
const postsRouter = require('./posts.routes');

router.use('/auth/', authRouter);
router.use('/posts/', postsRouter);

module.exports = router;

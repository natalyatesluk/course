import express from 'express';
import bookRouter from './bookRouter.js';

const router = express.Router();

router.use('/book', bookRouter);

export default router;

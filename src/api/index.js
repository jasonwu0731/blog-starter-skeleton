import { Router } from 'express';

import articleRouter from './article';

const router = new Router();

router.use('/articles', articleRouter);

export default router;

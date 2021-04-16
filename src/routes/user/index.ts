import { Response } from 'express';
import { router } from '@src/bootstrap';

import getById from '@src/routes/user/get-by-id';
import getAll from '@src/routes/user/get-all';

const prefix = '/users';

router.get(`${prefix}`, async (req, res): Promise<Response> => await getAll(req, res));
router.get(`${prefix}/:id`, async (req, res): Promise<Response> => await getById(req, res));

export default router;
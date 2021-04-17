import { Response } from 'express';
import { router } from '@src/bootstrap';

import getById from '@src/routes/user/get-by-id';
import getAll from '@src/routes/user/get-all';
import add from '@src/routes/user/add';
import update from '@src/routes/user/update';

const prefix = '/users';

router.get(`${prefix}`, async (req, res): Promise<Response> => await getAll(req, res));
router.get(`${prefix}/:id`, async (req, res): Promise<Response> => await getById(req, res));
router.post(`${prefix}`, async (req, res): Promise<Response> => await add(req, res));
router.put(`${prefix}/:id`, async (req, res): Promise<Response> => await update(req, res));

export default router;
import 'module-alias/register';
import 'reflect-metadata';

import express, { Request, Response } from 'express';
import { services } from '@src/container';

const app = express();

app.get('/user/:id', async (req: Request, res: Response): Promise<Response> => {
  const id = req.params.id ? req.params.id as string : null;
  if (!id) {
    return res.status(400).send({ error: true, message: 'invalid-id' });
  }

  try {
    const user = await services.user().getUserById(id);

    return res.status(200).json({ user });
  } catch (error) {
    return error.message
      ? res.status(400).json({ error: true, message: error.message })
      : res.status(500).json({ error: true, message: 'internal' });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('Server iniciado...'));
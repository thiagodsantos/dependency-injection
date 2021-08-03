import 'module-alias/register';
import 'reflect-metadata';

import { app } from '@src/bootstrap';

app.listen(process.env.PORT, () => console.log('Server iniciado...'));

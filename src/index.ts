import 'module-alias/register';
import 'reflect-metadata';

import app from '@src/routes/index';

app.listen(process.env.PORT || 3000, () => console.log('Server iniciado...'));
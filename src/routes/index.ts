import { app } from '@src/bootstrap';
import user from '@src/routes/user/index';

app.use(user);

export default app;
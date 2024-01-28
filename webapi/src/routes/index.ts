import { Router } from 'express';
import indexRouter from './index.routes';
import authRouter from './auth.routes';
import weatherRouter from './weather.routes'

const routes = Router();
routes.use('/', indexRouter);
routes.use('/auth', authRouter);
routes.use('/weather',weatherRouter);

export default routes;


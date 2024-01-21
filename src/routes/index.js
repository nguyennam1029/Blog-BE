
import user from './user';
import auth from './auth';
import post from './post';
import { notFound } from '../middlewares/handle_errors';
const initRoutes = (app) => {
    app.use('/api/v1/user', user);
    app.use('/api/v1/auth', auth);
    app.use('/api/v1/post', post);
    app.use(notFound)
}

module.exports = initRoutes
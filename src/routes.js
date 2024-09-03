import { Router } from 'express';
import User from './app/models/User';


const routes = new Router();

routes.get('/teste', async (req, res) => {
    const user = await User.create({
        name: 'Felipe',
        email: 'lippe0909@felipe.com',
        password_hash: '123123',
    });

    return res.json(user);
});

export default routes;
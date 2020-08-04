import { Router } from 'express';
import ClassesController from './controllers/ClassesController';


const routes = Router();

const classesController = new ClassesController();


routes.get('/', (req, res) => res.json({ message: "Tudo ok" }))

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

export default routes;
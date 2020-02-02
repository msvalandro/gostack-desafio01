import { Router } from 'express';

import ProjectController from './app/controllers/ProjectController';

const routes = new Router();
let counter = 0;

const checkIfProjectExists = (req, res, next) => {
  const { id } = req.params;
  const project = ProjectController.projects.find(p => p.id === parseInt(id));

  if (!project) {
    return res.status(400).json({ msg: 'Project not found.' });
  }

  return next();
};

routes.use((req, res, next) => {
  console.log(`Number of Requisitions: ${counter}`);
  counter++;

  return next();
});

routes.post('/projects', ProjectController.store.bind(ProjectController));
routes.get('/projects', ProjectController.index.bind(ProjectController));

routes.put(
  '/projects/:id',
  checkIfProjectExists,
  ProjectController.update.bind(ProjectController)
);
routes.delete(
  '/projects/:id',
  checkIfProjectExists,
  ProjectController.delete.bind(ProjectController)
);
routes.post(
  '/projects/:id/tasks',
  checkIfProjectExists,
  ProjectController.addTask.bind(ProjectController)
);

export default routes;

import {
  createTaskController,
  deleteAllTasks,
  selectAllTasks,
  selectAllTasksCreatedBy,
  selectTaskById,
  updateTeamTask,
} from '@/controllers/task/task';
import { FastifyInstance } from 'fastify';

const TaskRoutes = async (server: FastifyInstance) => {
  server.post(
    '/team/:id/task',
    {
      preValidation: [server.authenticate],
    },
    createTaskController,
  );

  server.get(
    '/team/:id/task',
    {
      preValidation: [server.authenticate],
    },
    selectAllTasks,
  );
  server.get(
    '/task',
    {
      preValidation: [server.authenticate],
    },
    selectAllTasksCreatedBy,
  );

  server.delete(
    '/team/:id/task/all',
    {
      preValidation: [server.authenticate],
    },
    deleteAllTasks,
  );
  server.get(
    '/task/:id',
    {
      preValidation: [server.authenticate],
    },
    selectTaskById,
  );

  server.patch(
    '/task/:id',
    {
      preValidation: [server.authenticate],
    },
    updateTeamTask,
  );
};

export default TaskRoutes;

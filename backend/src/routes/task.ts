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
      schema: {
        tags: ['Tasks'],
        summary: 'Create a new task for a team',
        description: 'This endpoint creates a new task under a specific team.',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Team identifier',
              format: 'uuid',
            },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string', description: 'Title of the task' },
            description: { type: 'string', nullable: true },
            priority: { type: 'string', nullable: true },
            estimative: { type: 'string', nullable: true },
            status: { type: 'string', nullable: true },
            labels: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of label IDs to be assigned to the task',
            },
            due_date: { type: 'string', format: 'date-time', nullable: true },
            assigned: { type: 'string', nullable: true },
          },
          required: ['title', 'team_id'],
        },
        response: {
          201: {
            description: 'Task created successfully',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  title: { type: 'string' },
                  description: { type: 'string', nullable: true },
                  priority: { type: 'string', nullable: true },
                  labels: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  due_date: {
                    type: 'string',
                    format: 'date-time',
                    nullable: true,
                  },
                  assigned: { type: 'string', nullable: true },
                  team: { type: 'object' },
                },
              },
            },
          },
          400: {
            description: 'Invalid request data',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    createTaskController,
  );

  server.get(
    '/team/:id/task',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Tasks'],
        summary: 'Get all tasks for a team',
        description: 'Retrieve all tasks associated with a specific team.',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Team identifier',
              format: 'uuid',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'List of tasks retrieved successfully',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    title: { type: 'string' },
                    labels: { type: 'array', items: { type: 'string' } },
                    team: { type: 'object' },
                  },
                },
              },
            },
          },
        },
      },
    },
    selectAllTasks,
  );

  server.get(
    '/task',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Tasks'],
        summary: 'Get all tasks created by or assigned to the current user',
        description:
          'Retrieve all tasks either created by or assigned to the authenticated user.',
        querystring: {
          type: 'object',
          properties: {
            filter: {
              type: 'string',
              description: 'Filter tasks by created or assigned',
              enum: ['created', 'assigned'],
            },
            workspace_id: {
              type: 'string',
              description: 'Workspace ID to filter tasks',
              format: 'uuid',
            },
          },
          required: ['workspace_id'],
        },
        response: {
          200: {
            description: 'Tasks retrieved successfully',
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    title: { type: 'string' },
                    labels: { type: 'array', items: { type: 'string' } },
                    team: { type: 'object' },
                  },
                },
              },
            },
          },
        },
      },
    },
    selectAllTasksCreatedBy,
  );

  server.delete(
    '/team/:id/task/all',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Tasks'],
        summary: 'Delete all tasks in a team',
        description: 'Delete all tasks for a specific team.',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Team identifier',
              format: 'uuid',
            },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'All tasks deleted successfully',
            type: 'object',
            properties: {
              data: { type: 'string' },
            },
            examples: [{ data: 'Deleted success' }],
          },
        },
      },
    },
    deleteAllTasks,
  );

  server.get(
    '/task/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Tasks'],
        summary: 'Get a task by its identifier',
        description:
          'Retrieve a task using its unique identifier and workspace ID.',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Task identifier',
              format: 'uuid',
            },
          },
          required: ['id'],
        },
        querystring: {
          type: 'object',
          properties: {
            workspace_id: {
              type: 'string',
              description: 'Workspace ID',
              format: 'uuid',
            },
          },
          required: ['workspace_id'],
        },
        response: {
          200: {
            description: 'Task retrieved successfully',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  title: { type: 'string' },
                  labels: { type: 'array', items: { type: 'string' } },
                  team: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
    selectTaskById,
  );

  server.patch(
    '/task/:id',
    {
      preValidation: [server.authenticate],
      schema: {
        tags: ['Tasks'],
        summary: 'Update a task by its identifier',
        description: "Edit a task's details using its unique identifier.",
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Task identifier',
              format: 'uuid',
            },
          },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string', nullable: true },
            priority: { type: 'string', nullable: true },
            labels: {
              type: 'array',
              items: { type: 'string' },
            },
            due_date: { type: 'string', format: 'date-time', nullable: true },
            assigned: { type: 'string', nullable: true },
          },
          required: ['title'],
        },
        response: {
          200: {
            description: 'Task updated successfully',
            type: 'object',
            properties: {
              data: {
                type: 'object',
                properties: {
                  id: { type: 'string', format: 'uuid' },
                  title: { type: 'string' },
                  labels: { type: 'array', items: { type: 'string' } },
                  team: { type: 'object' },
                },
              },
            },
          },
        },
      },
    },
    updateTeamTask,
  );
};

export default TaskRoutes;


// import { FastifyInstance } from 'fastify';

// const teamTasksRoutes = async (server: FastifyInstance) => {
//   server.get(
//     '/team/:id/tasks',
//     {
//       preValidation: [server.authenticate],
//       schema: {
//         tags: ['Team Tasks'],
//         security: [{ bearerAuth: [] }],
//         params: {
//           type: 'object',
//           properties: {
//             id: { type: 'string' },
//           },
//           required: ['id'],
//         },
//         response: {
//           200: {
//             description: 'Tasks added successfully',
//             type: 'object',
//             properties: {
//               tasks_ids: {
//                 type: 'array',
//                 items: { type: 'string' },
//               },
//             },
//           },
//         },
//       },
//     },
//     selectAllTaskAssigned,
//   );

//   server.post(
//     '/team/:id/tasks',
//     {
//       preValidation: [server.authenticate],
//       schema: {
//         tags: ['Team Tasks'],
//         security: [{ bearerAuth: [] }],
//         params: {
//           type: 'object',
//           properties: {
//             id: { type: 'string' },
//           },
//           required: ['id'],
//         },
//         body: {
//           type: 'object',
//           properties: {
//             tasks_ids: {
//               type: 'array',
//               items: { type: 'string' },
//             },
//           },
//           required: ['tasks_ids'],
//         },
//         response: {
//           200: {
//             description: 'Assigned added successfully',
//             type: 'object',
//             properties: {
//               tasks_ids: {
//                 type: 'array',
//                 items: { type: 'string' },
//               },
//             },
//           },
//         },
//       },
//     },
//     addTaskAssigned,
//   );

//   server.delete(
//     '/team/:id/tasks/:task_id',
//     {
//       preValidation: [server.authenticate],
//       schema: {
//         tags: ['Team Tasks'],
//         security: [{ bearerAuth: [] }],
//         params: {
//           type: 'object',
//           properties: {
//             id: { type: 'string' },
//             task_id: { type: 'string' },
//           },
//           required: ['id', 'task_id'],
//         },
//         response: {
//           200: {
//             description: 'Member removed successfully',
//             type: 'object',
//             properties: {
//               id: { type: 'string' },
//               task_id: { type: 'string' },
//             },
//           },
//         },
//       },
//     },
//     removeTaskAssigned,
//   );
// };

// export default teamTasksRoutes;

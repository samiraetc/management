import {
  createLabel,
  selectLabels,
  selectLabelByName,
} from '@/models/labels/labels';
import { createLabelSchema } from '@/models/labels/types';
import { sendResult, sendResultError } from '@/utils/send-results';
import { FastifyReply, FastifyRequest } from 'fastify';

const getAllLabels = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const labels = await selectLabels();
    sendResult(reply, labels);
  } catch (error: any) {
    sendResultError(reply, 'Failed to fetch labels');
  }
};

const postLabel = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const parsedBody = createLabelSchema.parse(request.body);
    const labelByName = await selectLabelByName(parsedBody.name);

    if (labelByName) {
      sendResultError(reply, 'Name already exists', 409);
      return;
    }

    const body = {
      name: parsedBody.name,
      color: parsedBody.color,
      created_at: new Date(),
    };

    const label = await createLabel(body);
    sendResult(reply, label, 201);
  } catch (error) {
    sendResultError(reply, 'Failed to create label');
  }
};

export { getAllLabels, postLabel };

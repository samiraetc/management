import {
  selectEstimates,
  selectEstimateByName,
} from '@/models/estimatives/estimatives';
import { sendResult, sendResultError } from '@/utils/send-results';
import { FastifyReply, FastifyRequest } from 'fastify';

const getEstimates = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const estimates = await selectEstimates();
    sendResult(reply, estimates);
  } catch (error) {
    sendResultError(reply, 'Failed to fetch estimates');
  }
};

const getEstimateByName = async (
  request: FastifyRequest<{
    Params: {
      name: string;
    };
  }>,
  reply: FastifyReply,
) => {
  try {
    const { name } = request.params;
    const estimate = await selectEstimateByName(name);

    if (!estimate) {
      sendResultError(reply, 'Estimate does not exist', 404);
      return;
    }

    sendResult(reply, estimate);
  } catch (error) {
    sendResultError(reply, 'Failed to fetch estimate');
  }
};

export { getEstimateByName, getEstimates };

import {
  createPriority,
  selectAllPriorities,
  selectPriority,
} from "@/models/priority/priorityModel";

import { prioritySchema } from "@/schemas/priority/prioritySchema";
import { FastifyReply, FastifyRequest } from "fastify";

const AllLabelController = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const labels = await selectAllPriorities();
    reply.code(200).send({ data: labels });
  } catch (error) {
    reply.code(400).send({ error: "Failed to fetch priorities" });
  }
};

const getLabelController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  try {
    const label = await selectPriority(id);
    reply.code(200).send({ data: label });
  } catch (error) {
    reply.code(400).send({ error: "Failed to fetch priority" });
  }
};

const createLabelController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const parsedBody = prioritySchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      value: parsedBody.value,
    };

    const label = await createPriority(body);
    reply.code(201).send({ data: label });
  } catch (error) {
    reply
      .code(400)
      .send({ error: "Failed to create priority", details: error });
  }
};

export { AllLabelController, createLabelController, getLabelController };

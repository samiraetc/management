import { createLabel, selectAllLabels, selectLabel } from "@/models/labels/labels";
import { labelSchema } from "@/schemas/labels/labelsSchema";
import { FastifyReply, FastifyRequest } from "fastify";

const AllLabelController = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const labels = await selectAllLabels();
    reply.code(200).send({ data: labels });
  } catch (error) {
    reply.code(400).send({ error: "Failed to fetch labels" });
  }
};

const getLabelController = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  try {
    const label = await selectLabel(id);
    reply.code(200).send({ data: label });
  } catch (error) {
    reply.code(400).send({ error: "Failed to fetch labels" });
  }
};

const createLabelController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const parsedBody = labelSchema.parse(request.body);

    const body = {
      name: parsedBody.name,
      color: parsedBody.color,
    };

    const label = await createLabel(body);
    reply.code(201).send({ data: label });
  } catch (error) {
    reply.code(400).send({ error: "Failed to create label", details: error });
  }
};

export { AllLabelController, createLabelController, getLabelController };

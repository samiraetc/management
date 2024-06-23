import { selectAllEstimatives, selectEstimativeByName } from "@/models/estimatives/estimativesModel";
import { FastifyReply, FastifyRequest } from "fastify";

const AllEstimativesController = async (_: FastifyRequest, reply: FastifyReply) => {
  try {

    reply.code(200).send({ data: await selectAllEstimatives() });
  } catch (error) {
    reply.code(400).send({ error: "Failed to fetch labels" });
  }
};

const getEstimativeByName = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
  const { name } = request.params as { name: string };
  const estimativeName  = await selectEstimativeByName(name)

  if(!estimativeName) {
    reply.code(404).send({ message: "Estimative do not exist" });
    return
  }
    reply.code(200).send({ data: estimativeName });
  } catch (error) {
    reply.code(400).send({ error: "Failed to fetch estimative" });
  }
};


export { getEstimativeByName, AllEstimativesController };

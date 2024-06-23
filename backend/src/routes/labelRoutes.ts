import {
  AllLabelController,
  createLabelController,
} from "@/controllers/labels/labelController";
import { FastifyInstance } from "@/types";

const labelRoutes = async (app: FastifyInstance) => {
  app.get(
    "/labels",
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ["Labels"],
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Resposta de sucesso",
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    name: { type: "string" },
                    color: { type: "string" },
                  },
                },
              },
            },
            examples: [
              {
                data: [
                  {
                    id: "bd23de17-f99c-4170-9189-521831851b55",
                    name: "bug",
                    color: "#eb5757",
                  },
                  {
                    id: "1c58d814-4998-42b2-97a7-88bdb05edd41",
                    name: "feature",
                    color: "#BB87FC",
                  },
                  {
                    id: "895716f0-8880-4b62-bf0b-9d0bca339bf1",
                    name: "improvement",
                    color: "#4EA7FC",
                  },
                  {
                    id: "7f89f9e2-25e5-4ce4-b204-69b3310b4d3a",
                    name: "canceled",
                    color: "#4EA7FC",
                  },
                ],
              },
            ],
          },
        },
      },
    },
    AllLabelController
  );

  app.post(
    "/labels",
    {
      preValidation: [app.authenticate],
      schema: {
        tags: ["Labels"],
        body: {
          type: "object",
          properties: {
            name: { type: "string" },
            color: { type: "string" },
          },
          required: ["name", "color"],
          examples: [
            {
              name: "bug",
              color: "#fff000",
            },
          ],
        },
        security: [{ bearerAuth: [] }],
        response: {
          200: {
            description: "Created successfully",
            type: "object",
            properties: {
              data: {
                type: "object",
                properties: {
                  id: {
                    type: "string",
                    format: "uuid",
                  },
                  name: { type: "string" },
                  color: { type: "string" },
                },
              },
            },
            examples: [
              {
                data: {
                  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                  name: "bug",
                  color: "#fff000",
                },
              },
            ],
          },
        },
      },
    },
    createLabelController
  );
};

export default labelRoutes;

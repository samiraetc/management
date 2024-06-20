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
    },
    AllLabelController
  );
  app.post(
    "/labels",
    {
      preValidation: [app.authenticate],
    },
    createLabelController
  );
};

export default labelRoutes;

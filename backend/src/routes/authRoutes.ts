import { loginController } from "@/controllers/auth/authController";
import { FastifyInstance } from "@/types";


const authRoutes = async (app: FastifyInstance) => {
  app.post("/login", loginController);
};

export default authRoutes;

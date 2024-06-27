import { selectUsersByEmail } from '@/models/user/user';
import { loginSchema } from '@/schemas/user/user';
import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from 'fastify';

const loginController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const parsedBody = loginSchema.parse(request.body);

    const user = await selectUsersByEmail(parsedBody.email);
    if (!user) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(
      parsedBody.password,
      user.password,
    );
    if (!isPasswordValid) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const token = request.server.jwt.sign({ email: user.email });
    reply.code(200).send({ token });
  } catch (error) {
    reply.code(400).send({ error: 'Login failed', details: error });
  }
};

export { loginController };

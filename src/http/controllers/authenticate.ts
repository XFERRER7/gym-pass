import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

  const schema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email, password } = schema.parse(request.body)

  const userRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(userRepository)

  try {

    await authenticateService.execute({
      email,
      password
    })

  }
  catch (err) {

    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message
      })
    }

    throw err
  }

  return reply.status(200).send()

}
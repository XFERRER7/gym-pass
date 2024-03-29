import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { userAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { makeRegisterService } from "@/services/factories/make-register-service";
import { RegisterService } from "@/services/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  })

  const { name, email, password } = schema.parse(request.body)

  const registerService = makeRegisterService()

  try {
    await registerService.execute({
      name, email, password
    })
  } catch (err) {

    if (err instanceof userAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message
      })
    }

    throw err
  }

  return reply.status(201).send()

}
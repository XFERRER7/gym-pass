import { client } from "@/lib/client";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { userAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { RegisterService } from "@/services/register";
import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function register(request: FastifyRequest, reply: FastifyReply) {

  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
  })

  const { name, email, password } = schema.parse(request.body)

  const usersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(usersRepository)

    try {
    await registerService.execute({
      name, email, password
    })
  } catch (err) {
    
    if(err instanceof userAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message
      })
    }

    throw err
  }

  return reply.status(201).send()

}
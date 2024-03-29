import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

  const schema = z.object({
    email: z.string().email(),
    password: z.string()
  })

  const { email, password } = schema.parse(request.body)

  const authenticateService = makeAuthenticateService()

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
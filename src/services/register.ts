import { client } from "@/lib/client"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UsersRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { userAlreadyExistsError } from "./errors/user-already-exists-error"

interface IregisterServiceParams {
  name: string
  email: string
  password: string
}

export class RegisterService {

  public constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: IregisterServiceParams) {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new userAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash
    })

  }

}

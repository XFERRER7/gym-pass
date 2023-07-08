import { UsersRepository } from "@/repositories/usersRepository"
import { hash } from "bcryptjs"
import { userAlreadyExistsError } from "./errors/user-already-exists-error"
import { User } from "@prisma/client"

interface IregisterServiceParams {
  name: string
  email: string
  password: string
}

interface IRegisterServiceResponse {
  user: User
}
export class RegisterService {

  public constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: IregisterServiceParams): Promise<IRegisterServiceResponse> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new userAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash
    })


    return {
      user
    }

  }

}

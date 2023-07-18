import { User } from "@prisma/client";
import { UsersRepository } from "@/repositories/interfaces/users-repository";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface IAuthenticateServiceRequest {
  email: string
  password: string
}

interface IAuthenticateServiceReponse {
  user: User
}

export class AuthenticateService {

  constructor(private userRepository: UsersRepository) { }

  async execute({ email, password }: IAuthenticateServiceRequest): Promise<IAuthenticateServiceReponse> {

    const user = await this.userRepository.findByEmail(email)

    if(!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }

  }

}
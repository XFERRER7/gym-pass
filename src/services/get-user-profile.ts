import { UsersRepository } from "@/repositories/usersRepository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface IGetUserProfileReponse {
  user: User
}

interface IGetUserProfileRequest {
  userId: string
}

export class GetUserProfile {

  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: IGetUserProfileRequest): Promise<IGetUserProfileReponse> {

    const user = await this.usersRepository.findById(userId)

    if(!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }

  }

}
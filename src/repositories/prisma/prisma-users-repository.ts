import { client } from "@/lib/client";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../usersRepository";
import { GetResult } from "@prisma/client/runtime";


export class PrismaUsersRepository implements UsersRepository {

  async create(data: Prisma.UserCreateInput) {

    const user = await client.user.create({
      data
    })

    return user

  }

  async findByEmail(email: string) {

    const user = await client.user.findUnique({
      where: {
        email
      }
    })

    return user

  }

  async findById(id: string) {
    
    const user = await client.user.findUnique({
      where: {
        id
      }
    })

    return user

  }

}

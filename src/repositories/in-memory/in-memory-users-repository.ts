import { Prisma, User } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { UsersRepository } from "../usersRepository";


export class InMemoryUsersRepository implements UsersRepository {

  public items: User[] = []

  async create(data: Prisma.UserCreateInput) {

    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      createdAt: new Date()
    }

    this.items.push(user)

    return user 

  }
  async findByEmail(email: string) {

    const user = this.items.find(item => item.email == email)

    if (!user) {
      return null
    }

    return user
  }

}
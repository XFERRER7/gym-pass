import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { describe, expect, it } from "vitest"
import { RegisterService } from "./register"
import { AuthenticateService } from "./authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "./errors/invalid-credentials-error"

describe('Authenticate service', () => {

  it('should be able authenticate user', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'teste@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should not be able authenticate with wrong email', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    expect(async () => 
    await sut.execute({
      email: 'teste@gmail.com',
      password: '123456'
    })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should be able authenticate with wrong password', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateService(usersRepository)

    await usersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password_hash: await hash('123456', 6)
    })

    expect(async () => {
      await sut.execute({
        email: 'teste@gmail.com',
        password: '123123'
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

})
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { AuthenticateService } from "../authenticate"
import { hash } from "bcryptjs"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"

let userRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate service', () => {

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(userRepository)
  })

  it('should be able authenticate user', async () => {

    await userRepository.create({
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

    await expect(() =>
      sut.execute({
        email: 'teste@gmail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

  it('should not be able authenticate with wrong password', async () => {

    await userRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => 
      sut.execute({
        email: 'teste@gmail.com',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)

  })

})
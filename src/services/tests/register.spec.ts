import { beforeEach, describe, expect, it, test } from 'vitest'
import { RegisterService } from '../user/register'
import { compare, compareSync } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { userAlreadyExistsError } from '../errors/user-already-exists-error'

let userRepository: InMemoryUsersRepository
let registerService: RegisterService

describe('Register service', () => {

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    registerService = new RegisterService(userRepository)
  })

  it('should be able register user', async () => {

    const { user } = await registerService.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should hash user password upon registration', async () => {

    const { user } = await registerService.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = compareSync('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able register with same email twice', async () => {

    const email = 'teste@gmail.com'

    await registerService.execute({
      name: 'teste',
      email,
      password: '123456'
    })

    await expect(() =>
      registerService.execute({
        name: 'teste',
        email,
        password: '123456'
      })
    ).rejects.toBeInstanceOf(userAlreadyExistsError)

  })

})

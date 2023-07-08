import { describe, expect, it, test } from 'vitest'
import { RegisterService } from './register'
import { compare, compareSync } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { userAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register service', () => {

  it('should be able register user', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456'
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should hash user password upon registration', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const { user } = await registerService.execute({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456'
    })

    const isPasswordCorrectlyHashed = compareSync('123456', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)

  })

  it('should not be able register with same email twice', async () => {

    const usersRepository = new InMemoryUsersRepository()
    const registerService = new RegisterService(usersRepository)

    const email = 'teste@gmail.com'

    await registerService.execute({
      name: 'teste',
      email,
      password: '123456'
    })

    await expect(async () => {
      await registerService.execute({
        name: 'teste',
        email,
        password: '123456'
      })
    }).rejects.toBeInstanceOf(userAlreadyExistsError)

  })

})

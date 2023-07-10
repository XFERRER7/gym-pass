import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { describe, it, beforeEach, expect } from "vitest";
import { GetUserProfile } from "../get-user-profile";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let userRepository: InMemoryUsersRepository
let getUserProfileService: GetUserProfile

describe('Get user profile', () => {

  beforeEach(() => {
    userRepository = new InMemoryUsersRepository()
    getUserProfileService = new GetUserProfile(userRepository)
  })

  it('should be able get user profile', async () => {

    const createdUser = await userRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password_hash: '123456'
    })

    const { user } = await getUserProfileService.execute({
      userId: createdUser.id
    })

    expect(user.id).toEqual(expect.any(String))

  })

  it('should not be able get user profile with wrong id', async () => {

    await expect(async () => 
      await getUserProfileService.execute({
        userId: 'non-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)

  })

})
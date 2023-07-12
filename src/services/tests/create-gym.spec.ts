import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { CreateGymService } from '../gym/create'


let gymRepository: InMemoryGymRepository
let gymService: CreateGymService

describe('Create gym service', () => {

  beforeEach(() => {

    gymRepository = new InMemoryGymRepository()
    gymService = new CreateGymService(gymRepository)

  })

  it('should be able to create a gym', async () => {

    const { gym } = await gymService.execute({
      title: 'Ruby Gym',
      description: 'description test',
      latitude: -243232,
      logitude: 293923,
      phone: '93247839349934'
    })

    expect(gym.id).toEqual(expect.any(String))

  })

})
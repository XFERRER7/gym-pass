import { IGymRepository } from '@/repositories/interfaces/gym-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetNearbyGymsService } from '../gym/get-nearby'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'

let repository: IGymRepository
let sut: GetNearbyGymsService

describe('Get nearby gyms service', () => {

  beforeEach(() => {

    repository = new InMemoryGymRepository()
    sut = new GetNearbyGymsService(repository)

  })

  it('should be able get nearby gyms', async () => {

    await repository.create({
      title: 'Nearby Gym',
      description: 'description test',
      latitude: -16.7090527,
      logitude: -49.2739725,
      phone: '93247839349934'
    })

    await repository.create({
      title: 'Far Gym',
      description: 'description test',
      latitude: -15.8038522,
      logitude: -47.9730448,
      phone: '93247839349934'
    })

    const { gyms } = await sut.execute({
      userLatitude: -16.7034588,
      userLongitude: -49.2733983
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Nearby Gym' })
    ])

  })

})
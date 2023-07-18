import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { SearchGymsService } from '../gym/search-gyms'


let gymRepository: InMemoryGymRepository
let gymService: SearchGymsService

describe('Search gyms service', () => {

  beforeEach(() => {

    gymRepository = new InMemoryGymRepository()
    gymService = new SearchGymsService(gymRepository)

  })

  it('should be able to search gyms', async () => {

    await gymRepository.create({
      title: 'Ruby Gym',
      description: 'description test',
      latitude: -243232,
      logitude: 293923,
      phone: '93247839349934'
    })

    await gymRepository.create({
      title: 'Java Gym',
      description: 'description test',
      latitude: -243232,
      logitude: 293923,
      phone: '93247839349934'
    })

    const { gyms } = await gymService.execute({
      query: 'Ruby Gym',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Ruby Gym', })
    ])

  })

  it('should be able search paginated gyms', async () => {


    for (let i = 1; i <= 22; i++) {

      await gymRepository.create({
        title: `Ruby Gym ${i}`,
        description: 'description test',
        latitude: -243232,
        logitude: 293923,
        phone: '93247839349934'
      })

    }

    const { gyms } = await gymService.execute({
      query: 'Ruby',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'Ruby Gym 21'}),
      expect.objectContaining({title: 'Ruby Gym 22'})
    ])

  })

})
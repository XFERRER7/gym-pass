import { ICheckInRepository } from '@/repositories/interfaces/check-in-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserCheckInsHistoryService } from '../check-in/get-user-check-ins-history'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

let checkInRepository: ICheckInRepository
let getUserCheckInsHistoryService: GetUserCheckInsHistoryService

describe('Get user check-ins history service', () => {

  beforeEach(() => {

    checkInRepository = new InMemoryCheckInRepository()
    getUserCheckInsHistoryService = new GetUserCheckInsHistoryService(checkInRepository)

  })

  it('should be able get user check-ins history', async () => {

    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkIns } = await getUserCheckInsHistoryService.execute({
      userId: 'user-01',
      page: 1
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' })
    ])

  })

  it('should be able get user paginated check-ins history', async () => {


    for(let i = 1; i <= 22; i++) {

      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01'
      })

    }

    const { checkIns } = await getUserCheckInsHistoryService.execute({
      userId: 'user-01',
      page: 2
    })

    expect(checkIns).toHaveLength(2)

  })


  
})
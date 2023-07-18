import { ICheckInRepository } from '@/repositories/interfaces/check-in-repository'
import { describe, it, beforeEach, expect } from 'vitest'
import { GetUserCheckInsHistoryService } from '../check-in/get-user-check-ins-history'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { GetUserMetricsSerivce } from '../check-in/get-user-metrics'

let checkInRepository: ICheckInRepository
let getUserMetricsService: GetUserMetricsSerivce

describe('Get user check-ins history service', () => {

  beforeEach(() => {

    checkInRepository = new InMemoryCheckInRepository()
    getUserMetricsService = new GetUserMetricsSerivce(checkInRepository)

  })

  it('should be able get check-ins count from metrics', async () => {

    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const { checkInsCount } = await getUserMetricsService.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)

  })
  
})
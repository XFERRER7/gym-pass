import { ICheckInRepository } from '@/repositories/check-inRepository'
import { describe, it, expect, beforeEach } from 'vitest'
import { CheckInService } from '../check-in'
import { PrismaCheckInRepository } from '@/repositories/prisma/prisma-check-in-repository'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

let checkInRepository: ICheckInRepository
let checkInService: CheckInService

describe('Check-in service', () => {

  beforeEach(() => {

    checkInRepository = new InMemoryCheckInRepository()
    checkInService = new CheckInService(checkInRepository)

  })

  it('should be able register check-in', async () => {

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01'
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

})
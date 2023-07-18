import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { ValidateCheckInService } from '../check-in/validate-check-in'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { LateCheckInValidationError } from '../errors/late-check-in-validation-error'

let checkInRepository: InMemoryCheckInRepository
let sut: ValidateCheckInService

describe('Valikdate check-in service', () => {

  beforeEach(async () => {

    checkInRepository = new InMemoryCheckInRepository()
    sut = new ValidateCheckInService(checkInRepository)

    vi.useFakeTimers()

  })

  afterEach(() => {
    vi.useRealTimers()
  })


  it('should be able to validate check-in', async () => {

    const createdCheckIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id
    })

    expect(checkIn.validate_at).toEqual(expect.any(Date))
    expect(checkIn.validate_at).toEqual(expect.any(Date))

  })

  it('should not be able to validate an inexistent check-in', async () => {

    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)

  })

  it('should not be able validate check-in after 20 minutes of its creation', async () => {

    vi.setSystemTime(new Date(1, 0, 2023, 13, 40))

    const checkIn = await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21

    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: checkIn.id
      })
    ).rejects.toBeInstanceOf(LateCheckInValidationError)

  })

})
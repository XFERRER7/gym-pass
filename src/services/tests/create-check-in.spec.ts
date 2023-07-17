import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { CheckInService } from '../check-in/check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxCheckinsError } from '../errors/max-check-ins-error'

let checkInRepository: InMemoryCheckInRepository
let gymRepository: InMemoryGymRepository
let checkInService: CheckInService

describe('Check-in service', () => {

  beforeEach(async () => {

    checkInRepository = new InMemoryCheckInRepository()
    gymRepository = new InMemoryGymRepository()
    checkInService = new CheckInService(checkInRepository, gymRepository)

    await gymRepository.create({
      id: 'gym-01',
      title: 'Ruby gym',
      description: 'Gym description',
      latitude: new Decimal(-16.708994),
      logitude: new Decimal(-49.2754097),
      phone: ''
    })

    vi.useFakeTimers()

  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able register check-in', async () => {

    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7088832,
      userLongitude: -49.2754097
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should not be able to check-in twice in the same day', async () => {

    vi.setSystemTime(new Date(2022, 10, 10, 8, 0, 0))

    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7088832,
      userLongitude: -49.2754097
    })

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -16.7088832,
        userLongitude: -49.2754097
      })
    ).rejects.toBeInstanceOf(MaxCheckinsError)

  })

  it('should be able to check-in twice in different days', async () => {

    vi.setSystemTime(new Date(2022, 10, 10, 8, 0, 0))

    await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7088832,
      userLongitude: -49.2754097
    })

    vi.setSystemTime(new Date(2022, 10, 11, 8, 0, 0))
    const { checkIn } = await checkInService.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -16.7088832,
      userLongitude: -49.2754097
    })

    expect(checkIn.id).toEqual(expect.any(String))

  })

  it('should not be able check-in on distant gym', async () => {

    gymRepository.items.push({
      id: 'gym-02',
      title: 'Java gym',
      description: 'Gym description',
      latitude: new Decimal(-16.7070435),
      logitude: new Decimal(-49.2740144),
      phone: ''
    })

    await expect(() =>
      checkInService.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -16.6577776,
        userLongitude: -49.1258878
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)

  })

})
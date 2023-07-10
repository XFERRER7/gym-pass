import { ICheckInRepository } from "@/repositories/interfaces/check-in-repository"
import { IGymRepository } from "@/repositories/interfaces/gym-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { calculateDistance } from "@/utlis/calculate-distance"

interface ICheckInServiceResponse {
  checkIn: CheckIn
}

interface ICheckInServiceRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export class CheckInService {

  constructor(
    private checkInRepository: ICheckInRepository,
    private gymRepository: IGymRepository
  ) { }

  async execute({ gymId, userId, userLatitude, userLongitude }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {


    const gym = await this.gymRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const MAX_DISTANCE = 0.1

    const distance = calculateDistance(
      {
        latitude: userLatitude,
        longitude: userLongitude
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.logitude.toNumber()
      }
    )
    
    if (distance > MAX_DISTANCE) {
      throw new Error()
    }

    const checkInOnSameDay = await this.checkInRepository.findByUserIdOnDate(userId, new Date())

    if (checkInOnSameDay) {
      throw new Error()
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }

  }

}
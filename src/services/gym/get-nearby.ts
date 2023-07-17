import { IGymRepository } from "@/repositories/interfaces/gym-repository"
import { Gym } from "@prisma/client"


interface IGetNearbyGymsServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface IGetNearbyGymsServiceResponse {
  gyms: Gym[]
}

export class GetNearbyGymsService {

  constructor(
    private gymRepository: IGymRepository
  ) { }

  async execute({ userLatitude, userLongitude }: IGetNearbyGymsServiceRequest): Promise<IGetNearbyGymsServiceResponse> {

    const gyms = await this.gymRepository.findNearby({
      userLatitude,
      userLongitude
    })

    return {
      gyms
    }

  }

}
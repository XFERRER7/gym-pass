import { IGymRepository } from "@/repositories/interfaces/gym-repository"
import { Gym } from "@prisma/client"

interface ICreateGymServiceRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  logitude: number
}

interface ICreateGymServiceResponse {
  gym: Gym
}

export class CreateGymService {

  constructor(
    private gymRepository: IGymRepository
  ) {}

  async execute({ title, description, latitude, logitude, phone }:ICreateGymServiceRequest): Promise<ICreateGymServiceResponse> {

    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      logitude
    })

    if(!gym) {
      throw new Error()
    }

    return {
      gym
    }

  }

}
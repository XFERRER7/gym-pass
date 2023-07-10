import { ICheckInRepository } from "@/repositories/check-inRepository"
import { CheckIn } from "@prisma/client"

interface ICheckInServiceResponse {
  checkIn: CheckIn
}

interface ICheckInServiceRequest {
  userId: string
  gymId: string
}

export class CheckInService {

  constructor(private checkInRepository: ICheckInRepository) {}

  async execute({ gymId, userId }: ICheckInServiceRequest): Promise<ICheckInServiceResponse> {

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }

  }

}
import { ICheckInRepository } from "@/repositories/interfaces/check-in-repository"
import { CheckIn } from "@prisma/client"


interface IGetUserCheckInsHistoryRequest {
  userId: string
  page: number
}


interface IGetUserCheckInsHistoryResponse {
  checkIns: CheckIn[]
}

export class GetUserCheckInsHistoryService {

  constructor(private checkInRepository: ICheckInRepository) { }

  async execute({ userId, page }: IGetUserCheckInsHistoryRequest): Promise<IGetUserCheckInsHistoryResponse> {

    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }

  }

}
import { ICheckInRepository } from "@/repositories/interfaces/check-in-repository";

interface IGetUserMetricsRequest {
  userId: string
}

interface IGetUserMetricsResponse {
  checkInsCount: number
}


export class GetUserMetricsSerivce {

  constructor(
    private checkInRepository: ICheckInRepository
  ) { }

  async execute({ userId }: IGetUserMetricsRequest): Promise<IGetUserMetricsResponse> {

    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return {
      checkInsCount
    }

  }

}
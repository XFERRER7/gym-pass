import { IGymRepository } from "@/repositories/interfaces/gym-repository"
import { Gym } from "@prisma/client"

interface ISearchGymsServiceRequest {
  query: string
  page: number
}

interface ISearchGymsServiceResponse {
  gyms: Gym[]
}


export class SearchGymsService {

  constructor(
    private gymsRepository: IGymRepository
  ) { }

  async execute({ query, page }: ISearchGymsServiceRequest): Promise<ISearchGymsServiceResponse> {

    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms
    }
  }

}
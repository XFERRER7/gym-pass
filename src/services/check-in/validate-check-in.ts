import { ICheckInRepository } from "@/repositories/interfaces/check-in-repository"
import { CheckIn } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"
import dayjs from "dayjs"
import { LateCheckInValidationError } from "../errors/late-check-in-validation-error"

interface IValidateCheckInServiceRequest {
  checkInId: string
}

interface IValidateCheckInServiceResponse {
  checkIn: CheckIn
}

export class ValidateCheckInService {

  constructor(
    private checkInRepository: ICheckInRepository
  ) { }

  async execute({ checkInId }: IValidateCheckInServiceRequest): Promise<IValidateCheckInServiceResponse> {

    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validate_at = new Date()

    const distanceInMinutesFromCreationDate = dayjs(checkIn.validate_at).diff(
      checkIn.createdAt,
      'minutes'
    )
      console.log(distanceInMinutesFromCreationDate)
    if(distanceInMinutesFromCreationDate > 20) {
      throw new LateCheckInValidationError()
    }

    const updatedCheckIn = await this.checkInRepository.save(checkIn)

    return {
      checkIn: updatedCheckIn
    }

  }

}
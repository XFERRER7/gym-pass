import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInRepository } from "../interfaces/check-in-repository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";


export class InMemoryCheckInRepository implements ICheckInRepository {

  private items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {

    const checkIn: CheckIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      createdAt: new Date(),
      validate_at: data.validate_at ? new Date(data.validate_at) : null
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {

    const startOfTheDate = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')

    const checkInOnSameDay = this.items.find(item => {

      const checkInDate = dayjs(item.createdAt)
      const isOnSameDate = checkInDate.isBefore(endOfTheDate) && checkInDate.isAfter(startOfTheDate) 

      return item.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDay) {
      return null
    }

    return checkInOnSameDay

  }

}
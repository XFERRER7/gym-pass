import { CheckIn, Prisma } from "@prisma/client"
import { ICheckInRepository } from "../interfaces/check-in-repository"
import { randomUUID } from "crypto"
import dayjs from "dayjs"


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

  async save(checkIn: CheckIn) {
    
    const checkInIndex = this.items.findIndex(item => item.id === checkIn.id)

    if(checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

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

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter(item => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId(userId: string) {

    return this.items.filter(item => item.user_id === userId).length

  }

  async findById(id: string) {
    
    const checkIn = this.items.find(item => item.id === id)

    if(!checkIn) {
      return null
    }

    return checkIn

  }

}
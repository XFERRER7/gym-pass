import { CheckIn, Prisma } from "@prisma/client"
import { client } from "@/lib/client"
import { ICheckInRepository } from "../interfaces/check-in-repository"
import dayjs from "dayjs"

export class PrismaCheckInRepository implements ICheckInRepository {

  async create(data: Prisma.CheckInUncheckedCreateInput) {

    const checkIn = await client.checkIn.create({
      data: {
        gym_id: data.gym_id,
        user_id: data.user_id,
      }
    })

    return checkIn
  }

  async save(checkIn: CheckIn) {
    
    const updatedCheckIn = await client.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn
    })

    return updatedCheckIn
  }
  
  async findByUserIdOnDate(userId: string, date: Date) {
    
    const startOfTheDate = dayjs(date).startOf('date')
    const endOfTheDate = dayjs(date).endOf('date')
    
    const checkIn = await client.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAt: {
          gte: startOfTheDate.toDate(),
          lte: endOfTheDate.toDate()
        }
      }
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await client.checkIn.findMany({
      where: {
        user_id: userId
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return checkIns
  }

  async countByUserId(userId: string) {

    const numberOfcheckIns = await client.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return numberOfcheckIns
  }

  async findById(id: string) {

    const checkIn = await client.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }

}
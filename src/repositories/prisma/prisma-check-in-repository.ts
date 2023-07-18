import { CheckIn, Prisma } from "@prisma/client";
import { client } from "@/lib/client";
import { ICheckInRepository } from "../interfaces/check-in-repository";
import { GetResult } from "@prisma/client/runtime";

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
    
    const checkIn = await client.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAt: date
      }
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await client.checkIn.findMany({
      where: {
        user_id: userId
      }
    })

    return checkIns.slice((page - 1) * 20, page * 20)
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
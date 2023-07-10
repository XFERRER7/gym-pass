import { Prisma } from "@prisma/client";
import { client } from "@/lib/client";
import { ICheckInRepository } from "../interfaces/check-in-repository";

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

}
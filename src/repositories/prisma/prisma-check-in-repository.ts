import { Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { ICheckInRepository } from "../check-inRepository";
import { client } from "@/lib/client";

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
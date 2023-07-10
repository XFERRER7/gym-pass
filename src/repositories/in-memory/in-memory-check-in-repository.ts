import { CheckIn, Prisma } from "@prisma/client";
import { ICheckInRepository } from "../check-inRepository";
import { randomUUID } from "crypto";


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

}
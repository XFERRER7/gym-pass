import { Gym, Prisma } from "@prisma/client";
import { IGymRepository } from "../interfaces/gym-repository";
import { randomUUID } from "crypto";


export class InMemoryGymRepository implements IGymRepository {
  async create(data: Prisma.GymCreateInput) {

    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      logitude: new Prisma.Decimal(data.logitude.toString()),
    }

    this.items.push(gym)

    return gym

  }

  public items: Gym[] = []

  async findById(id: string) {

    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym

  }

} 
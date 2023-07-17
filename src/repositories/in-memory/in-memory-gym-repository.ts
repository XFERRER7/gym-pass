import { Gym, Prisma } from "@prisma/client";
import { IGymRepository, TFinNearbyParams } from "../interfaces/gym-repository";
import { randomUUID } from "crypto";
import { GetResult } from "@prisma/client/runtime";
import { calculateDistance } from "@/utlis/calculate-distance";


export class InMemoryGymRepository implements IGymRepository {

  public items: Gym[] = []

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

  async findById(id: string) {

    const gym = this.items.find(item => item.id === id)

    if (!gym) {
      return null
    }

    return gym

  }

  async searchMany(query: string, page: number) {

    return this.items
      .filter(item => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)

  }

  async findNearby({ userLatitude, userLongitude }: TFinNearbyParams) {

    return this.items.filter(item => {

      const distance = calculateDistance(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: item.latitude.toNumber(), longitude: item.logitude.toNumber() }
      )

      console.log(distance)

      return distance < 10

    })

  }

} 
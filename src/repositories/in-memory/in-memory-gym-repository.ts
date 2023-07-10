import { Gym } from "@prisma/client";
import { IGymRepository } from "../interfaces/gym-repository";


export class InMemoryGymRepository implements IGymRepository {

  public items: Gym[] = []

  async findById(id: string) {

    const gym = this.items.find(item => item.id === id)

    if(!gym) {
      return null
    }

    return gym

  }

} 
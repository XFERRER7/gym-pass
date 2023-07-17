import { Gym, Prisma } from "@prisma/client";

export type TFinNearbyParams = {
  userLatitude: number
  userLongitude: number
}

export interface IGymRepository {

  create(data: Prisma.GymCreateInput): Promise<Gym>
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findNearby({userLatitude, userLongitude}: TFinNearbyParams): Promise<Gym[]>

}
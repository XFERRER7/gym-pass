import { Gym, Prisma } from "@prisma/client";
import { GetResult, Decimal } from "@prisma/client/runtime";
import { IGymRepository, TFinNearbyParams } from "../interfaces/gym-repository";
import { client } from "@/lib/client";
import { calculateDistance } from "@/utlis/calculate-distance";


export class PrismaGymRepository implements IGymRepository {

  async create(data: Prisma.GymCreateInput) {

    const gym = await client.gym.create({
      data
    })

    return gym

  }

  async findById(id: string) {

    const gym = await client.gym.findUnique({
      where: {
        id
      }
    })

    return gym

  }

  async searchMany(query: string, page: number) {

    const gyms = await client.gym.findMany({
      where: {
        title: {
          contains: query
        }
      },
      take: 20,
      skip: (page - 1) * 20
    })

    return gyms

  }

  async findNearby({ userLatitude, userLongitude }: TFinNearbyParams) {

    const gyms = await client.$queryRaw<Gym[]>`
      SELECT * FROM gyms
        WHERE (
          CASE
            WHEN (from_latitude = to_latitude AND from_longitude = to_longitude)
              THEN 0
            ELSE
              ACOS(
                LEAST(
                  SIN(PI() * from_latitude / 180) * SIN(PI() * to_latitude / 180) +
                  COS(PI() * from_latitude / 180) * COS(PI() * to_latitude / 180) *
                  COS((PI() * from_longitude / 180) - (PI() * to_longitude / 180)),
                  1
                )
              ) * 180 / PI() * 60 * 1.1515 * 1.609344
          END
          ) <= 10
        `

    return gyms

  }

}
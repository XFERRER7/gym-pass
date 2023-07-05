import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333)
})

const _env = schema.safeParse(process.env)

if(_env.success === false) {
  console.log(_env.error)
  throw new Error("Invalid environment variables")
}

export const env = _env.data
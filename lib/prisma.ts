import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/src/generated/prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  const adapter = new PrismaPg({ connectionString })

  return new PrismaClient({ adapter })
}

function isPrismaClientStale(client: PrismaClient) {
  return !('feedback' in client)
}

function getPrismaClient() {
  const cached = globalForPrisma.prisma
  if (cached && !isPrismaClientStale(cached)) {
    return cached
  }

  const client = createPrismaClient()

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client
  }

  return client
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrismaClient()
    const value = Reflect.get(client, prop, receiver)
    return typeof value === 'function' ? value.bind(client) : value
  },
})

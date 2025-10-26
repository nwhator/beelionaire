const hasDatabaseUrl = Boolean(process.env.DATABASE_URL)

let PrismaClient: any
try {
  // require lazily to avoid Prisma parsing schema at build time when DATABASE_URL is absent
  PrismaClient = require('@prisma/client').PrismaClient
} catch (e) {
  PrismaClient = undefined
}

type PrismaClientType = any

declare global {
  // allow global `var` in development to preserve the PrismaClient across module reloads
  // eslint-disable-next-line no-var
  var prisma: PrismaClientType | undefined
}

// Create the client or a helpful proxy, but ensure the `export` is a top-level declaration
let _prisma: PrismaClientType

if (hasDatabaseUrl && PrismaClient) {
  _prisma = global.prisma ?? new PrismaClient()
  if (process.env.NODE_ENV !== 'production') global.prisma = _prisma
} else {
  const handler: ProxyHandler<any> = {
    get(_target, prop) {
      return () => {
        throw new Error(
          `Prisma is not initialized because DATABASE_URL is not set. Tried to access: ${String(prop)}`
        )
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _prisma = new Proxy({}, handler) as any
}

export const prisma = _prisma as PrismaClientType

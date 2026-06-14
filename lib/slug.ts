import { prisma } from '@/lib/prisma'

const SLUG_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789'
const SLUG_LENGTH = 6

function randomSlug(): string {
  let slug = ''
  for (let i = 0; i < SLUG_LENGTH; i++) {
    slug += SLUG_CHARS[Math.floor(Math.random() * SLUG_CHARS.length)]
  }
  return slug
}

export async function generateUniqueProjectSlug(): Promise<string> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const slug = randomSlug()
    const existing = await prisma.project.findUnique({ where: { slug } })
    if (!existing) return slug
  }

  throw new Error('Failed to generate unique project slug')
}

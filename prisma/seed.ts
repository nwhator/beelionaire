import { prisma } from '../lib/prisma'

async function main() {
  console.log('Seeding...')

  await prisma.task.createMany({ data: [
    { title: 'Read Article: How to earn', url: 'https://example.com/post1', reward: 5 },
    { title: 'Watch tutorial', url: 'https://example.com/post2', reward: 5 },
  ] })

  await prisma.question.createMany({ data: [
    { category: 'spelling', question: 'Spell the word for a large sum of money', options: JSON.stringify(['millionaire','billionaire','beelionaire']), answer: 'beelionaire' },
    { category: 'grammar', question: 'Choose correct sentence', options: JSON.stringify(['She dont like it','She doesn\'t like it']), answer: "She doesn't like it" },
  ] })

  console.log('Seeded.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })

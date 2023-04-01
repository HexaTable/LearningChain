import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      wallet: "0x0000000"
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
    },
  });

  const course1 = await prisma.course.create({
    data: {
      name: 'Introduction to Prisma',
      description: 'Learn how to use Prisma to build a modern database layer for your applications',
      author: { connect: { id: user1.id } },
      price: 29.99,
      category: { create: { name: 'Programming' } },
      rating: 5.0,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: 'GraphQL with Apollo',
      description: 'Build a GraphQL API with Apollo Server and connect it to a database using Prisma',
      author: { connect: { id: user2.id } },
      price: 49.99,
      category: { create: { name: 'Web Development' } },
      rating: 4.0,
    },
  });

  console.log(`Created user with email: ${user1.email}`);
  console.log(`Created user with email: ${user2.email}`);
  console.log(`Created course with name: ${course1.name}`);
  console.log(`Created course with name: ${course2.name}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

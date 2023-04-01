import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Seed users
  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.name.firstName() + " " + faker.name.lastName(),
        email: faker.internet.email(),
        wallet: faker.finance.bitcoinAddress(),
      },
    });
    console.log(`Created user with email: ${user.email}`);
  }

  // Seed categories
  for (let i = 0; i < 10; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
    console.log(`Created category with name: ${category.name}`);
  }

  // Seed courses
  const users = await prisma.user.findMany();
  const categories = await prisma.category.findMany();
  for (let i = 0; i < 10; i++) {
    const random_category =
      categories[Math.floor(Math.random() * categories.length)];
    const random_user = users[Math.floor(Math.random() * users.length)];

    const course = await prisma.course.create({
      data: {
        name: faker.commerce.productName(),
        author: { connect: { id: random_user.id } },
        description: faker.lorem.paragraph(),
        price: Math.random() * 100,
        category: { connect: { id: random_category.id } },
        rating: Math.random() * 5,
      },
    });
    console.log(`Created course with name: ${course.name}`);
  }
}

// Seed the database
main().finally(async () => {
  await prisma.$disconnect();
});

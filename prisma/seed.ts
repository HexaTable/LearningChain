import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

import coursesData from "../data/courses.json";

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
  const categories = [
    "Cybersecurity",
    "Artificial Intelligence",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Mobile Development",
    "Blockchain",
    "Game Development",
    "Computer Science",
    "Finance",
  ];
  ("");
  for (let i = 0; i < categories.length; i++) {
    const category = await prisma.category.create({
      data: {
        name: categories[i],
      },
    });

    console.log(`Created category with name: ${category.name}`);
  }

  // Seed courses
  const users = await prisma.user.findMany();
  coursesData.map(async (course) => {
    const random_user = users[Math.floor(Math.random() * users.length)];
    const category = await prisma.category.findFirst({
      where: { name: course.category },
    });

    const result = await prisma.course.create({
      data: {
        name: course.name,
        author: { connect: { id: random_user.id } },
        description: course.description,
        price: course.price,
        category: { connect: { id: category.id } },
        rating: course.rating,
        numReviews: course.num_reviews,
      },
    });

    console.log(`Created course with name: ${result.name}`);
  });
}

// Seed the database
main().finally(async () => {
  await prisma.$disconnect();
});

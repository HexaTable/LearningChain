import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// METHOD /api/courses
// Required fields in body: name, description, category, price, author
export default async function handle(req: any, res: any) {
  const session = await getSession({ req });
  const body = JSON.parse(req.body);

  // POST /api/courses
  if (req.method == "POST") {
    const category = await prisma.category.findFirst({
      where: { name: body.category },
    });

    const result = await prisma.course.create({
      data: {
        name: body.name,
        description: body.description,
        category: { connect: { id: category.id } },
        price: parseFloat(body.price),
        author: { connect: { email: session?.user?.email } },
      },
    });

    res.status(200).json({ message: "Course created", data: result });
  }
}

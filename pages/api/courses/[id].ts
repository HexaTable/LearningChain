import prisma from "../../../lib/prisma";

// METHOD /api/courses/:id
export default async function handle(req: any, res: any) {
  const courseId: string = req.query.id;
  const body = JSON.parse(req.body);

  // DELETE /api/courses/:id
  if (req.method === "DELETE") {
    await prisma.course.delete({
      where: { id: courseId },
    });

    res.status(200).json({ message: "Course deleted" });
  }

  // PUT /api/courses/:id
  else if (req.method === "PUT") {
    const category = await prisma.category.findFirst({
      where: { name: body.category },
    });

    const result = await prisma.course.update({
      where: { id: courseId },
      data: {
        name: body.name,
        description: body.description,
        category: { connect: { id: category.id } },
        price: parseFloat(body.price),
      },
    });

    res.status(200).json({ message: "Course updated", data: result });
  }
}

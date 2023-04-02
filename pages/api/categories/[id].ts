import prisma from "../../../lib/prisma";

// METHOD /api/categories/:id
export default async function handle(req: any, res: any) {
  const categoryId: string = req.query.id;

  // GET /api/categories/:id
  if (req.method === "GET") {
    const category = await prisma.category.findFirst({
      where: { id: categoryId },
    });

    res.status(200).json(category);
  }
}

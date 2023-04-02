import prisma from "../../../lib/prisma";

// METHOD /api/courses/buy
export default async function handle(req: any, res: any) {
  const { courseId, email } = JSON.parse(req.body);

  // Get user
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  // POST /api/courses/buy
  if (req.method === "POST") {
    await prisma.userCoursesPurchased.create({
      data: {
        userId: user.id,
        courseId: courseId,
      },
    });

    res.status(200).json({ message: "Course bought" });
  }
}

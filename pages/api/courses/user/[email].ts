import prisma from "../../../../lib/prisma";

// METHOD /api/courses/user/:email
export default async function handle(req: any, res: any) {
  const email: string = req.query.email;

  // Get user
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  // GET /api/courses/user/:email
  if (req.method === "GET") {
    const courses = await prisma.userCoursesPurchased.findMany({
      where: { userId: user?.id },
      include: {
        course: true,
      },
    });

    // Only courses
    const coursesOnly = courses.map((course) => course.course);

    res.status(200).json(coursesOnly);
  }
}

// pages/api/courses/[id].ts

import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
export default async function handle(req, res) {
  const postId: string = req.query.id;
  const { name, description, price, image, category } = req.body;

  // DELETE /api/post/:id
  if (req.method === 'DELETE') {
    const post = await prisma.course.delete({
      where: { id: postId },
    });
    res.json(post);
  }
  else if (req.method === 'PUT') {
    const post = await prisma.course.update({
      where: { id: postId },
      data: { name, description, price, image, category },
    });
    res.status(200).json({ message: 'Course updated' })
  }
  else {
    console.log("Course could not be modified")
    res.status(400).json({ message: "Course could not be modified" })
  }
}

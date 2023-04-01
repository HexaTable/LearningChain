// pages/api/users/[id].ts

import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(req, res) {
  const userId: string = req.query.id;
  const { name, image, wallet, rating } = req.body;

  // DELETE /api/user/:id
  if (req.method === "DELETE") {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    res.json(user);
  }
  // PUT /api/user/:id
  else if (req.method === "PUT") {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { name, image, wallet, rating },
    });

    res.status(200).json({ message: "User updated", data: user });
  }
}

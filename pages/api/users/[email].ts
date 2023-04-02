import prisma from "../../../lib/prisma";

// METHOD /api/users/:email
export default async function handle(req: any, res: any) {
  const email: string = req.query.email;

  // PUT /api/users/:email
  if (req.method === "PUT") {
    const body = JSON.parse(req.body);
    const wallet = body.wallet;

    const user = await prisma.user.update({
      where: { email: email },
      data: { wallet: wallet },
    });

    res.status(200).json({ message: "User updated", data: user });
  }
}

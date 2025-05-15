import { prisma } from "@/lib/prisma";

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
      // Your logic to fetch users
    },
    user: async (_: unknown, args: { id: number }) => {
      const { id } = args;
      return await prisma.user.findUnique({
        where: { id },
      });
    },
    userByEmail: async (_: unknown, args: { email: string }) => {
      const { email } = args;
      return await prisma.user.findUnique({
        where: { email },
      });
    },
     
  },
  Mutation: {
    createUser: async (_: unknown, args: { username: string; email: string; password: string }) => {
      const { username, email, password } = args;
      return await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });
    },
    updateUser: async (_: unknown, args: { id: number; username?: string; email?: string }) => {
      const { id, username, email } = args;
      return await prisma.user.update({
        where: { id },
        data: {
          username,
          email,
        },
      });
    },
    deleteUser: async (_: unknown, args: { id: number }) => {
      const { id } = args;
      return await prisma.user.delete({
        where: { id },
      });
    },
  },
};

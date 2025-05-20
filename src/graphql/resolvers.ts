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
    tweets: async () => {
      return await prisma.tweet.findMany();
      // Your logic to fetch tweets
    },
  },
  Tweet : {
    author: async (parent: { userId: number }) => {
      const { userId } = parent;
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    },
  },

  Mutation: {
    createUser: async (_: unknown, args: { fullName: string; email: string;  }) => {
      const { fullName, email} = args;
      return await prisma.user.create({
        data: {
          fullName,
          email,
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
    createTweet: async (_: unknown, args: { content: string, userId: number }) => {
      
      // Assuming you have a session object with user information
      return await prisma.tweet.create({
        data: {
          content: args.content,
          userId: args.userId, // Assuming you have the user ID from the session
        },
      });
    },
  },
};

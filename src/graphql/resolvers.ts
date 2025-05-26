
import prisma  from "@/lib/prisma";

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
  Tweet: {
    author: async (parent: { userId: number }) => {
      const { userId } = parent;
      return await prisma.user.findUnique({
        where: { id: userId },
      });
    },
    likes: async (parent: { id: number }) => {
      const { id } = parent;
      const likes = await prisma.like.findMany({
        where: { tweetId: id },
        include: {
          user: true,
        },
      });

      return likes ?? []; // Ensure non-null return
    },

  },


  Mutation: {
    createUser: async (_: unknown, args: { fullName: string; email: string;   profileImage:string }) => {
      const { fullName, email,profileImage } = args;
      return await prisma.user.create({
        data: {
          fullName,
          email,
          profileImage,
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
    CreateReply: async (_: unknown, args: { content: string, userId: number, tweetId: number }) => {
      // Assuming you have a session object with user information
      return await prisma.reply.create({
        data: {
          content: args.content,
          userId: args.userId, // Assuming you have the user ID from the session
          tweetId: args.tweetId,
        },
      });
    },
    createLike: async (_: unknown, args: { tweetId: number, userId: number }) => {
      const { tweetId, userId } = args;
      return await prisma.like.create({
        data: {
          tweetId,
          userId,
        },
      });
    },
    deleteLike: async (_: unknown, args: { tweetId: number, userId: number }) => {
      const { tweetId, userId } = args;
      return (await prisma.like.deleteMany({
        where: {
          tweetId,
          userId,
        },
      })).count > 0;
    // Return true if at least one like was deleted
    // Return false if no likes were deleted
    },

  },
};

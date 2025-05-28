import { gql } from "@apollo/client";

export const typeDefs = gql`

 enum NotificationType {
  LIKE
  REPLY
  FOLLOW
  MESSAGE
}
type User {
  id: Int!
  fullName: String
  username: String
  email: String!
  password: String
  profileImage: String
  dateOfBirth: String
  phoneNumber: String

  tweets: [Tweet!]!
  likes: [Like!]!
  replies: [Reply!]!
  bookmarks: [Bookmark!]!
  followers: [Follow!]!
  following: [Follow!]!
  notifications: [Notification!]!
  sentMessages: [Message!]!
  receivedMessages: [Message!]!
}

type Tweet {
  id: Int!
  content: String!
  userId: Int!
  author: User!    # relation to User
  createdAt: String!
  updatedAt: String!
  likes: [Like]
  replies: [Reply!]!
  hashtags: [TweetHashtag!]!
  bookmarks: [Bookmark!]!
  notifications: [Notification!]!
}

type Like {
  id: Int!
  tweetId: Int!
  userId: Int!
  createdAt: String!
  updatedAt: String!
  tweet: Tweet!
  user: User!
}

type Reply {
  id: Int!
  content: String!
  tweetId: Int!
  userId: Int!
  createdAt: String!
  updatedAt: String!
  tweet: Tweet!
  user: User!
}

type Hashtag {
  id: Int!
  name: String!
  tweetTags: [TweetHashtag!]!
  createdAt: String!
  updatedAt: String!
}

type Bookmark {
  id: Int!
  tweetId: Int!
  userId: Int!
  createdAt: String!
  updatedAt: String!
  tweet: Tweet!
  user: User!
}

type Follow {
  id: Int!
  followerId: Int!
  followingId: Int!
  createdAt: String!
  updatedAt: String!
  follower: User!
  following: User!
}

type Notification {
  id: Int!
  userId: Int!
  tweetId: Int
  createdAt: String!
  updatedAt: String!
  user: User!
  tweet: Tweet
  type: NotificationType!
}

type Message {
  id: Int!
  senderId: Int!
  receiverId: Int!
  content: String!
  createdAt: String!
  updatedAt: String!
  sender: User!
  receiver: User!
}

type TweetHashtag {
  id: Int!
  tweetId: Int!
  hashtagId: Int!
  createdAt: String!
  updatedAt: String!
  tweet: Tweet!
  hashtag: Hashtag!
}


type Query {
  users: [User!]!
  user(id: Int!): User
  userByEmail(email: String!): User
  tweets: [Tweet!]!
}
 
  type Mutation {
    createUser(fullName: String, email: String!,profileImage:String): User!
    updateUser(id: Int!, username: String, email: String, password: String): User!
    deleteUser(id: Int!): Boolean!
    CreateTweet(content: String!,userId:Int!): Tweet!
    createLike(tweetId: Int!, userId: Int!): Like!
    deleteLike(tweetId: Int!, userId: Int!): Boolean!
    CreateReply(content: String!, tweetId: Int!, userId: Int!): Reply!
  }
  
`;

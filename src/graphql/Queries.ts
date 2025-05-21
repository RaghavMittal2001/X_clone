import { gql } from "@apollo/client";

const All_Tweets = gql`
  query AllTweets {
    tweets {
      userId
      updatedAt
      id
      createdAt
      content
      author {
        id
        fullName
        email
        profileImage
      }
      likes {
        id
        user {
          id
        }
      }
    }
  }
`;

const CREATE_TWEET = gql`
  mutation CreateTweet($content: String!, $userId: Int!) {
    createTweet(content: $content, userId: $userid) {
      id
      content
    }
  }
`;
const CREATE_REPLY = gql`
  mutation CreateReply($tweetId: Int!, $userId: Int!, $content: String!) {
    CreateReply(tweetId: $tweetId, userId: $userId, content: $content) {
      id
      content
      createdAt
    }
  }
`;
const CREATE_LIKE = gql`
  mutation CreateLike($tweetId: Int!, $userId: Int!) {
    createLike(tweetId: $tweetId, userId: $userId) {
      id
      tweetId
      userId
    }
  }
`;
const DELETE_LIKE = gql`
  mutation DeleteLike($tweetId: Int!, $userId: Int!) {
    deleteLike(tweetId: $tweetId, userId: $userId) 
  }
`;

export { All_Tweets, CREATE_TWEET, CREATE_REPLY , CREATE_LIKE, DELETE_LIKE};
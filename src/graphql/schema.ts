import { gql } from "@apollo/client";


export const typeDefs = gql`
  type User {
  id: Int!
  username: String!
  email: String!
  password: String!
  profileImage: String
  location: String
  dateOfBirth: String
  phoneNumber: String
}

type Query {
  users: [User!]!
  user(id: Int!): User
  userByEmail(email: String!): User
}
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(id: Int!, username: String, email: String, password: String): User!
    deleteUser(id: Int!): Boolean!
  }
  
`;

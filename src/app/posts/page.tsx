'use client';

import { gql, useQuery } from '@apollo/client';

const GET_POSTS = gql`
  query Query {
  users {
    id
    username
    email
    password
    profileImage
    location
    dateOfBirth
    phoneNumber
  }
}
`;

export default function HomePage() {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  else console.log(data);
   
  return (
    <ul>
        <li>Users</li>
      {data.users.map((user: { id: string; username: string; email: string; password: string; profileImage: string; location: string; dateOfBirth: string; phoneNumber: string }) => (
        <li key={user.id}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
          <p>Profile Image: {user.profileImage}</p>
          <p>Location: {user.location}</p>
          <p>Date of Birth: {user.dateOfBirth}</p>
          <p>Phone Number: {user.phoneNumber}</p>
        </li>
      ))}
      {/* Uncomment the following lines to display posts */}
      {/* <li>Posts</li> */}
      {/* Uncomment the following lines to display posts */}
      {/* {data.posts.map((post:  unknown) => (
        <li key={post.id}>{post.title}</li>
      ))} */}
    </ul>
  );
}

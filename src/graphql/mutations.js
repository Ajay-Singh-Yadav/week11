import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      phone
      age
      profession
      address
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      content
      userId
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      phone
      age
      profession
      address
    }
  }
`;

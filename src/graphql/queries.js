// graphql/queries.js
import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers($options: PageQueryOptions) {
    getAllUsers(options: $options) {
      data {
        id
        name
        email
        phone
        profession
        address
        age
      }
      meta {
        totalCount
      }
    }
  }
`;

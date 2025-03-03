import {gql} from 'graphql-request';

export const whitelistSpotsDocument = gql`
  query WhitelistSpots($collectionId: String) {
    whitelistPartner(collectionId: $collectionId) {
    nodes {
      updatedAt
      position
      numberOfSpots
      image
      id
      createdAt
      collectionName
      collectionId
    }
    }
  }
`;

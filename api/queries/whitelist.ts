import {gql} from 'graphql-request';

export const whitelistSpotsDocument = gql`
  query WhitelistSpots($collectionId: String) {
    whitelistSpotByCollection(collectionId: $collectionId) {
      nodes {
        amount
        collectionId
        wallet
      }
    }
  }
`;

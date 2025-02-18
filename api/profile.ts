import {GQL_BASE} from '@/constants/url';
import {useQuery} from '@tanstack/react-query';
// import { graphql } from './gql';
import {GraphQLClient, gql} from 'graphql-request';

const graphQLClient = new GraphQLClient(GQL_BASE);

const userProfileDocument = gql`
  query UserProfile($id: String) {
    profile(id: $id) {
      nodes {
        bannerURL
        createdAt
        description
        discordImageURL
        discordUsername
        discordVerified
        email
        emailVerified
        googleImageURL
        id
        instagramImageURL
        instagramUsername
        instagramVerified
        referralCode
        referredBy
        referrerCount
        telegramID
        points
        telegramImageURL
        telegramUsername
        telegramVerified
        thumbnailURL
        twitterID
        twitterImageURL
        twitterUsername
        twitterVerified
        updatedAt
        username
        wallets
        youtubeImageURL
        youtubeUsername
        youtubeVerified
      }
    }
  }
`;

export function useFetchProfile(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const data = await graphQLClient.request(userProfileDocument, {id});
      return data;
    },
    enabled: false,
    retry: false,
  });
}

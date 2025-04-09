import {gql} from 'graphql-request';

export const userProfileDocument = gql`
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
        points
        referralCode
        leaderboardPosition
        referredBy
        wallets
        username
        updatedAt
        twitterVerified
        twitterUsername
        twitterImageURL
        twitterID
        thumbnailURL
        telegramVerified
        telegramUsername
        telegramImageURL
        telegramID
        registeredWhitelist
        referrerCount
      }
    }
  }
`;

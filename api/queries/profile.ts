import { gql} from 'graphql-request';

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
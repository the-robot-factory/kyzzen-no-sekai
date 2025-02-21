import { GraphQLClient } from 'graphql-request';
import { GQL_BASE } from '@/constants/url';

export const graphQLClient = new GraphQLClient(GQL_BASE, {
  headers: {
    'Content-Type': 'application/json',
  },
});

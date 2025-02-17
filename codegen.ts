import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: 'https://v8lkzf4yd2.execute-api.us-east-2.amazonaws.com/go-gql',
    documents: ['src/**/*.tsx'],
    ignoreNoDocuments: true,
    generates: {
        './api/gql/': {
            preset: 'client',
            config: {
                documentMode: 'string'
            }
        }
    }
}

export default config
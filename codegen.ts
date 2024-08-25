import type { CodegenConfig } from '@graphql-codegen/cli'
 
// environment variable is undefined : (
// TODO: figure out how to remove fallback value
const config: CodegenConfig = {
  schema: process.env.VITE_ANILIST_GRAPHQL_URL ?? 'https://graphql.anilist.co',
  documents: ['src/**/*.tsx', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}
 
export default config
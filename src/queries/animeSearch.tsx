import { makeGraphQlQuery } from "./graphQlQuery";

const query = `query anime_search($searchTerm: String!) {
  Page(page: 1, perPage: 5) {
    media(type: ANIME, search: $searchTerm) {
      id
      title {
        english
        romaji
      }
    }
  }
}
`

export const animeSearchQuery = async (searchTerm: string) => {
    return makeGraphQlQuery(query, { searchTerm })
}
import { makeGraphQlQuery } from "./graphQlQuery";

export type Anime = {
  id: number;
  title: {
      romaji: string;
      english: string;
  }
}

type AnimeSearchResponse = {
  data: {
    Page: {
      media: Anime[]
    }
  }
}

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

export const animeSearchQuery = async (searchTerm: string): Promise<AnimeSearchResponse> => {
    return makeGraphQlQuery(query, { searchTerm })
}
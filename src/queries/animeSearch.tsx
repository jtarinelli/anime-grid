import { graphql } from "../gql/gql";

// replace with generated type?
export type Anime = {
  id: number;
  title: {
      romaji: string;
      english: string;
  }
}

export const animeSearchQuery = graphql(`query anime_search($searchTerm: String!) {
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
`)
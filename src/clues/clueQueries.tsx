import { ClueType, ClueQueryInfo } from "./types";

// idk if this should stay here or go into queries
// think here at least for now, if adding a new clue type want to just go to this folder
const clueQueries: Record<ClueType, ClueQueryInfo> = {
  [ClueType.SOURCE]: {
    fields: `source`,
    isPaginated: false,
  },
  [ClueType.GENRE]: {
    fields: `genres`,
    isPaginated: false,
  },
  [ClueType.STUDIO]: {
    fields: `studios(sort: NAME, isMain: true) {
            nodes {
              name
            }
          }`,
    isPaginated: false,
  },
  [ClueType.YEAR]: {
    fields: `seasonYear`,
    isPaginated: false,
  },
  [ClueType.EPISODES]: {
    fields: `episodes`,
    isPaginated: false,
  },
  [ClueType.FORMAT]: {
    fields: `format`,
    isPaginated: false,
  },
  [ClueType.WORDS_IN_TITLE]: {
    fields: `title {
            english
            romaji
            }`,
    isPaginated: false,
  },
  [ClueType.TAG]: {
    fields: `tags {
      name
      category
      rank
      isMediaSpoiler
    }`,
    isPaginated: false,
  },
  [ClueType.VOICE_ACTOR]: {
    // idk if perPage needs to be a variable too, dep on what the diff paginated things are ig
    // how to get rid of node? don't need character name????
    // can only pick 1 role, ideally would want main and supporting but guess we're getting EVERYONE
    fields: `characters(sort: RELEVANCE, page: $page, perPage: 50) {
            edges {
              voiceActors(language: JAPANESE, sort: RELEVANCE) {
                name {
                  full
                }
              }
              node {
                name {
                  full
                }
              }
            }
            pageInfo {
              hasNextPage
            }
          }`,
    isPaginated: true,
    getHasNextPage: (queryData: any) => queryData.data.Media.characters.pageInfo.hasNextPage,
  }
}

export default clueQueries;
import { graphql } from "../gql/gql";
import { ClueType, ClueQueryInfo } from "./types";

// idk if this should stay here or go into queries
// think here at least for now, if adding a new clue type want to just go to this folder
// is there a point in using the graphql codegen fragments when not using it to make the requests...?
export const clueQueries: Record<ClueType, ClueQueryInfo> = {
  [ClueType.SOURCE]: {
    fragment: graphql(`
      fragment Source on Media {
        source
      }
      `),
    fragmentName: 'Source',
    isPaginated: false,
  },
  [ClueType.GENRE]: {
    fragment: graphql(`
      fragment Genres on Media {
        genres
      }
      `),
    fragmentName: 'Genres',
    isPaginated: false,
  },
  [ClueType.STUDIO]: {
    fragment: graphql(`
      fragment Studios on Media {
        studios(sort: NAME, isMain: true) {
            nodes {
                name
              }
            }
          }
    `),
    fragmentName: 'Studios',
    isPaginated: false,
  },
  [ClueType.YEAR]: {
    fragment: graphql(`
      fragment Year on Media {
        seasonYear
      }
      `),
    fragmentName: 'Year',
    isPaginated: false,
  },
  [ClueType.EPISODES]: {
    fragment: graphql(`
      fragment Episodes on Media {
        episodes
      }
      `),
    fragmentName: 'Episodes',
    isPaginated: false,
  },
  [ClueType.FORMAT]: {
    fragment: graphql(`
      fragment Format on Media {
        format
      }
      `),
    fragmentName: 'Format',
    isPaginated: false,
  },
  [ClueType.FIRST_LETTER]: {
    fragment: graphql(`
      fragment Title on Media {
        title {
          english
          romaji
          }
        }
            `),
    fragmentName: 'Title',
    isPaginated: false,
  },
  [ClueType.WORDS_IN_TITLE]: {
    fragment: graphql(`
      fragment Title on Media {
        title {
          english
          romaji
          }
        }
            `),
    fragmentName: 'Title',
    isPaginated: false,
  },
  [ClueType.TAG]: {
    fragment: graphql(`
      fragment Tags on Media {
        tags {
          name
          category
          rank
          isMediaSpoiler
        }
      }
      `),
    fragmentName: 'Tags',
    isPaginated: false,
  },
  [ClueType.VOICE_ACTOR]: {
    // how to get rid of node? don't need character name????
    // can only pick 1 role, ideally would want main and supporting but guess we're getting EVERYONE
    fragment: graphql(`
      fragment Characters on Media {
        characters(sort: RELEVANCE, page: $page, perPage: 25) {
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
            }
      }
            `),
    fragmentName: 'Characters',
    isPaginated: true,
    getHasNextPage: (queryData: any) => queryData.Media.characters.pageInfo.hasNextPage,
  }
}

export default clueQueries;
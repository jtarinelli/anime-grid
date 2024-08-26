/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      fragment Source on Media {\n        source\n      }\n      ": types.SourceFragmentDoc,
    "\n      fragment Genres on Media {\n        genres\n      }\n      ": types.GenresFragmentDoc,
    "\n      fragment Studios on Media {\n        studios(sort: NAME, isMain: true) {\n            nodes {\n                name\n              }\n            }\n          }\n    ": types.StudiosFragmentDoc,
    "\n      fragment Year on Media {\n        seasonYear\n      }\n      ": types.YearFragmentDoc,
    "\n      fragment Episodes on Media {\n        episodes\n      }\n      ": types.EpisodesFragmentDoc,
    "\n      fragment Format on Media {\n        format\n      }\n      ": types.FormatFragmentDoc,
    "\n      fragment Title on Media {\n        title {\n          english\n          romaji\n          }\n        }\n            ": types.TitleFragmentDoc,
    "\n      fragment Tags on Media {\n        tags {\n          name\n          category\n          rank\n          isMediaSpoiler\n        }\n      }\n      ": types.TagsFragmentDoc,
    "\n      fragment Characters on Media {\n        characters(sort: RELEVANCE, page: $page, perPage: 25) {\n              edges {\n                voiceActors(language: JAPANESE, sort: RELEVANCE) {\n                  name {\n                    full\n                  }\n                }\n                node {\n                  name {\n                    full\n                  }\n                }\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n      }\n            ": types.CharactersFragmentDoc,
    "query anime_poster($id: Int!) {\n        Media(id: $id) {\n          coverImage {\n            large\n          }\n        }\n      }": types.Anime_PosterDocument,
    "query anime_search($searchTerm: String!) {\n  Page(page: 1, perPage: 5) {\n    media(type: ANIME, search: $searchTerm) {\n      id\n      title {\n        english\n        romaji\n      }\n    }\n  }\n}\n": types.Anime_SearchDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Source on Media {\n        source\n      }\n      "): (typeof documents)["\n      fragment Source on Media {\n        source\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Genres on Media {\n        genres\n      }\n      "): (typeof documents)["\n      fragment Genres on Media {\n        genres\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Studios on Media {\n        studios(sort: NAME, isMain: true) {\n            nodes {\n                name\n              }\n            }\n          }\n    "): (typeof documents)["\n      fragment Studios on Media {\n        studios(sort: NAME, isMain: true) {\n            nodes {\n                name\n              }\n            }\n          }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Year on Media {\n        seasonYear\n      }\n      "): (typeof documents)["\n      fragment Year on Media {\n        seasonYear\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Episodes on Media {\n        episodes\n      }\n      "): (typeof documents)["\n      fragment Episodes on Media {\n        episodes\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Format on Media {\n        format\n      }\n      "): (typeof documents)["\n      fragment Format on Media {\n        format\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Title on Media {\n        title {\n          english\n          romaji\n          }\n        }\n            "): (typeof documents)["\n      fragment Title on Media {\n        title {\n          english\n          romaji\n          }\n        }\n            "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Tags on Media {\n        tags {\n          name\n          category\n          rank\n          isMediaSpoiler\n        }\n      }\n      "): (typeof documents)["\n      fragment Tags on Media {\n        tags {\n          name\n          category\n          rank\n          isMediaSpoiler\n        }\n      }\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      fragment Characters on Media {\n        characters(sort: RELEVANCE, page: $page, perPage: 25) {\n              edges {\n                voiceActors(language: JAPANESE, sort: RELEVANCE) {\n                  name {\n                    full\n                  }\n                }\n                node {\n                  name {\n                    full\n                  }\n                }\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n      }\n            "): (typeof documents)["\n      fragment Characters on Media {\n        characters(sort: RELEVANCE, page: $page, perPage: 25) {\n              edges {\n                voiceActors(language: JAPANESE, sort: RELEVANCE) {\n                  name {\n                    full\n                  }\n                }\n                node {\n                  name {\n                    full\n                  }\n                }\n              }\n              pageInfo {\n                hasNextPage\n              }\n            }\n      }\n            "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query anime_poster($id: Int!) {\n        Media(id: $id) {\n          coverImage {\n            large\n          }\n        }\n      }"): (typeof documents)["query anime_poster($id: Int!) {\n        Media(id: $id) {\n          coverImage {\n            large\n          }\n        }\n      }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query anime_search($searchTerm: String!) {\n  Page(page: 1, perPage: 5) {\n    media(type: ANIME, search: $searchTerm) {\n      id\n      title {\n        english\n        romaji\n      }\n    }\n  }\n}\n"): (typeof documents)["query anime_search($searchTerm: String!) {\n  Page(page: 1, perPage: 5) {\n    media(type: ANIME, search: $searchTerm) {\n      id\n      title {\n        english\n        romaji\n      }\n    }\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
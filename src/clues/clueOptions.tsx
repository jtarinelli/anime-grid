import { ClueType } from "./types";

const clueOptions: Record<ClueType, any[]> = {
    [ClueType.EPISODES]: [
        { max: 13 },
        { min: 20 },
    ],
    [ClueType.GENRE]: [
        "Action",
        "Romance",
        "Sports", // may not go with some studios or even female VAs ( :( )
        "Slice of Life",
        "Drama",
        "Fantasy",
        "Comedy",
        "Music",
    ],
    [ClueType.STUDIO]: [
        "Trigger",
        "Production I.G",
        "bones",
        "Kyoto Animation",
        "MADHOUSE",
        "MAPPA",
        "Shaft",
        "Studio Ghibli", // only make movies can't be combined with episode counts
    ],
    [ClueType.VOICE_ACTOR]: [
        "Yuuki Kaji",
        "Kenjirou Tsuda",
        "Mamoru Miyano",
        "Tomokazu Sugita",
        "Yuuichi Nakamura",
        "Yoshimasa Hosoya",
        "Daisuke Ono",
        "Kenshou Ono",
        "Saori Hayami",
        "Kana Hanazawa",
        "Miyuki Sawashiro",
        "Takehito Koyasu",
        "Natsuki Hanae",
    ],
    [ClueType.YEAR]: [
        { max: 2020 },
        { max: 2010 },
        { max: 2000 }, // this will not work with most popular voice actors...
        // also some studios (mappa, trigger are new)
    ],
    [ClueType.WORDS_IN_TITLE]: [
        { number: 1 },
        { min: 3 },
    ],
    [ClueType.TAG]: [
        "Shoujo",
        "Shounen",
        "Josei",
        "Seinen",
    ],
    [ClueType.MOVIE]: [undefined], // can't be combined with episode counts
    [ClueType.ORIGINAL]: [undefined],
}

export default clueOptions;
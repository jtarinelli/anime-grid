import { ClueOption, ClueType } from "./types";

const clueOptions: Record<ClueType, ClueOption[]> = {
    [ClueType.EPISODES]: [
        { value: { max: 13 } },
        { value: { min: 20 } },
    ],
    [ClueType.GENRE]: [
        { value: "Action", },
        { value: "Romance", },
        { value: "Sports", }, // may not go with some studios or even female VAs ( :( )
        { value: "Slice of Life", },
        { value: "Drama", },
        { value: "Fantasy", },
        { value: "Comedy", },
        { value: "Music", },
    ],
    [ClueType.STUDIO]: [
        { value: "Trigger", },
        { value: "Production I.G", },
        { value: "bones", },
        { value: "Kyoto Animation", },
        { value: "MADHOUSE", },
        { value: "MAPPA", },
        { value: "Shaft", },
        { value: "Studio Ghibli", }, // only make movies can't be combined with episode counts, also doesn't use voice actors much
        { value: "Gainax", },
        { value: "A-1 Pictures", },
        { value: "P.A. Works", },
        { value: "Sunrise", },
        { value: "Toei Animation", },
    ],
    [ClueType.VOICE_ACTOR]: [
        { value: "Yuuki Kaji", },
        { value: "Kenjirou Tsuda", },
        { value: "Mamoru Miyano", },
        { value: "Tomokazu Sugita", },
        { value: "Yuuichi Nakamura", },
        { value: "Yoshimasa Hosoya", },
        { value: "Daisuke Ono", },
        { value: "Kenshou Ono", },
        { value: "Saori Hayami", },
        { value: "Kana Hanazawa", },
        { value: "Miyuki Sawashiro", },
        { value: "Takehito Koyasu", },
        { value: "Natsuki Hanae", },
        { value: "Hiroshi Kamiya", },
        { value: "Rie Takahashi", },
        { value: "Nobuhiko Okamoto", },
        { value: "Aoi Yuuki", },
        { value: "Yoshitsugu Matsuoka", },
        { value: "Junichi Suwabe", },
        { value: "Kouki Uchiyama", },
    ],
    [ClueType.YEAR]: [
        { value: { max: 2020 }, },
        { value: { max: 2010 }, },
        { value: { max: 2000 }, }, // this will not work with most popular voice actors...
        // also some studios (mappa, trigger are new)
        { value: { min: 2010 }, },
    ],
    [ClueType.WORDS_IN_TITLE]: [
        { value: { number: 1 }, },
        { value: { min: 3 }, },
        { value: { max: 3 }, },
    ],
    [ClueType.TAG]: [
        { value: "Shoujo", }, // demographics are based off manga magazines mostly so don't go with original
        { value: "Shounen", },
        { value: "Josei", },
        { value: "Seinen", },
    ],
    [ClueType.FORMAT]: [
        { value: "MOVIE", }, // can't be combined with episode counts, unless want to count as 1 ep
    ],
    [ClueType.SOURCE]: [
        { value: "ORIGINAL", },
    ],
}

export default clueOptions;
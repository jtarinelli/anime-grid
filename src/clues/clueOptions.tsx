import { ClueType } from "./types";

const clueOptions: Record<ClueType, any[]> = {
    [ClueType.EPISODES]: [
        { max: 13 },
        { min: 20 },
    ],
    [ClueType.GENRE]: [
        "Action",
        "Romance",
        "Sports",
        "Slice of Life",
        "Drama",
        "Fantasy",
        "Comedy"
    ],
    [ClueType.STUDIO]: [
        "Trigger",
        "Production I.G",
        "bones",
        "Kyoto Animation",
        "MADHOUSE",
        "MAPPA",
        "Shaft",
        "Studio Ghibli"
    ],
    [ClueType.VOICE_ACTOR]: [
        "Yuuki Kaji",
        "Kenjirou Tsuda",
        "Mamoru Miyano"
    ],
    [ClueType.YEAR]: [
        { max: 2020 },
        { max: 2010 },
        { max: 2000 }, // this will not work with most popular voice actors...
    ],
    [ClueType.MOVIE]: [undefined], // can't be combined with episode counts
    [ClueType.ORIGINAL]: [undefined],
}

export default clueOptions;
import { ClueOption, ClueType } from "./types";
import { voiceActors } from "./voiceActors";

const clueOptions: Record<ClueType, ClueOption[]> = {
    [ClueType.EPISODES]: [
        { value: { max: 13 }, noGos: [{ type: ClueType.EPISODES }] },
        { value: { min: 20 }, noGos: [{ type: ClueType.EPISODES }] },
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
        { value: "Sci-Fi", },
        { value: "Mystery", },
        { value: "Thriller", },
    ],
    [ClueType.STUDIO]: [
        { value: "Trigger", yearsActive: { min: 2012 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "Production I.G", yearsActive: { min: 1987 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "bones", yearsActive: { min: 2000 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "Kyoto Animation", yearsActive: { min: 2003 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "MADHOUSE", yearsActive: { min: 1973 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "MAPPA", yearsActive: { min: 2012 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "Shaft", yearsActive: { min: 1995 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "Studio Ghibli", yearsActive: { min: 1986 }, noGos: [{ type: ClueType.STUDIO }, { type: ClueType.EPISODES }, { type: ClueType.VOICE_ACTOR }] },
        { value: "Gainax", yearsActive: { min: 1981, max: 2015 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "A-1 Pictures", yearsActive: { min: 2006 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "P.A. Works", yearsActive: { min: 2008 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "Sunrise", yearsActive: { min: 1972 }, noGos: [{ type: ClueType.STUDIO }] },
        { value: "Toei Animation", yearsActive: { min: 1957 }, noGos: [{ type: ClueType.STUDIO }] },
    ],
    [ClueType.VOICE_ACTOR]: voiceActors,
    [ClueType.YEAR]: [
        { value: { max: 2000 }, noGos: [{ type: ClueType.YEAR }] },
        { value: { min: 2000, max: 2010 }, noGos: [{ type: ClueType.YEAR }] },
        { value: { min: 2010, max: 2020 }, noGos: [{ type: ClueType.YEAR }] },
        { value: { min: 2020 }, noGos: [{ type: ClueType.YEAR }] },
    ],
    [ClueType.WORDS_IN_TITLE]: [
        { value: { number: 1 }, noGos: [{ type: ClueType.WORDS_IN_TITLE }] },
        { value: { min: 3 }, noGos: [{ type: ClueType.WORDS_IN_TITLE }] },
        { value: { max: 3 }, noGos: [{ type: ClueType.WORDS_IN_TITLE }] },
    ],
    [ClueType.FIRST_LETTER]: [
        { value: { min: 'A', max: 'I' }, noGos: [{ type: ClueType.FIRST_LETTER }] },
        { value: { min: 'J', max: 'Q' }, noGos: [{ type: ClueType.FIRST_LETTER }] },
        { value: { min: 'R', max: 'Z' }, noGos: [{ type: ClueType.FIRST_LETTER }] },
    ],
    [ClueType.TAG]: [
        { value: "Shoujo", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" }, { type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Josei" },] },
        { value: "Shounen", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shoujo" }, { type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Josei" },] },
        { value: "Josei", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" }, { type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Shoujo" },] },
        { value: "Seinen", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" }, { type: ClueType.TAG, value: "Shoujo" }, { type: ClueType.TAG, value: "Josei" },] },
        { value: "Female Protagonist", noGos: [{ type: ClueType.TAG, value: "Male Protagonist" }] },
        { value: "Male Protagonist", noGos: [{ type: ClueType.TAG, value: "Female Protagonist" }] },
    ],
    [ClueType.FORMAT]: [
        { value: "MOVIE", noGos: [{ type: ClueType.EPISODES }] },
    ],
    [ClueType.SOURCE]: [
        { value: "ORIGINAL", },
    ],
}

export default clueOptions;
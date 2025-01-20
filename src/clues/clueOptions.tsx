import { ClueOption, ClueType } from "./types";
import { voiceActors } from "./voiceActors";

const clueOptions: Record<ClueType, ClueOption[]> = {
    [ClueType.EPISODES]: [
        { value: { max: 13 }, description: "The series has no more than 13 episodes. Only TV anime count, no movies or specials.", noGos: [{ type: ClueType.EPISODES }] },
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
        { value: { number: 1 }, description: "The title has only one word. Words are only counted if they are separated by spaces, other separators like hyphens don't count.", noGos: [{ type: ClueType.WORDS_IN_TITLE }] },
        { value: { min: 3 }, description: "The title has at least three words. Words are only counted if they are separated by spaces, other separators like hyphens don't count.", noGos: [{ type: ClueType.WORDS_IN_TITLE }] },
        { value: { max: 3 }, description: "The title has three or less words. Words are only counted if they are separated by spaces, other separators like hyphens don't count.", noGos: [{ type: ClueType.WORDS_IN_TITLE }] },
    ],
    [ClueType.FIRST_LETTER]: [
        { value: { min: 'A', max: 'I' }, description: 'The first letter of the title is between A and I, inclusive. If there is an official English translation than it can also be used in addition to the romanized Japanese title.', noGos: [{ type: ClueType.FIRST_LETTER }] },
        { value: { min: 'J', max: 'Q' }, description: 'The first letter of the title is between J and Q, inclusive. If there is an official English translation than it can also be used in addition to the romanized Japanese title.', noGos: [{ type: ClueType.FIRST_LETTER }] },
        { value: { min: 'R', max: 'Z' }, description: 'The first letter of the title is between R and Z, inclusive. If there is an official English translation than it can also be used in addition to the romanized Japanese title.', noGos: [{ type: ClueType.FIRST_LETTER }] },
    ],
    [ClueType.TAG]: [
        { value: "Shoujo", description: "Adapted from a shoujo manga magazine, ie one aimed at girls.", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" }, { type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Josei" },] },
        { value: "Shounen", description: "Adapted from a shounen manga magazine, ie one aimed at boys.", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shoujo" }, { type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Josei" },] },
        { value: "Josei", description: "Adapted from a josei manga magazine, ie one aimed at women.", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" }, { type: ClueType.TAG, value: "Seinen" }, { type: ClueType.TAG, value: "Shoujo" },] },
        { value: "Seinen", description: "Adapted from a seinen manga magazine, ie one aimed at seinen.", noGos: [{ type: ClueType.SOURCE, value: "ORIGINAL" }, { type: ClueType.TAG, value: "Shounen" }, { type: ClueType.TAG, value: "Shoujo" }, { type: ClueType.TAG, value: "Josei" },] },
        { value: "Female Protagonist", noGos: [{ type: ClueType.TAG, value: "Male Protagonist" }] },
        { value: "Male Protagonist", noGos: [{ type: ClueType.TAG, value: "Female Protagonist" }] },
    ],
    [ClueType.FORMAT]: [
        { value: "MOVIE", noGos: [{ type: ClueType.EPISODES }] },
    ],
    [ClueType.SOURCE]: [
        { value: "ORIGINAL", description: "An anime original, ie has no source material like a manga, book, or video game."},
    ],
}

export default clueOptions;
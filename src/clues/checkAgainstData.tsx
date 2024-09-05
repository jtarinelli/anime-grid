import { Clue, ClueType } from "./types";

const checkClueAgainstData = (clue: Clue, guessData: any): boolean => {
    const { type, data: { value } } = clue;
    const animeData = guessData.Media;

    switch (type) {
        case ClueType.GENRE:
            return animeData.genres.includes(value)
        case ClueType.SOURCE:
            return animeData.source === value;
        case ClueType.FORMAT:
            return animeData.format === value;
        case ClueType.STUDIO:
            return animeData.studios.nodes.some((node: any) => node.name === value);
        case ClueType.VOICE_ACTOR:
            return animeData.characters.edges.some((edge: any) => edge.voiceActors.some((voiceActor: any) => voiceActor.name.full === value))
        case ClueType.YEAR: {
            const { min, max } = value;
            // feel like this logic could be simplified
            if (min && max) {
                return animeData.seasonYear >= min && animeData.seasonYear <= max;
            } else if (min) {
                return animeData.seasonYear >= min
            }
            return animeData.seasonYear <= max;
        }
        case ClueType.EPISODES: {
            const { min, max } = value;
            // feel like this logic could be simplified
            if (min && max) {
                return animeData.episodes >= min && animeData.episodes <= max;
            } else if (min) {
                return animeData.episodes >= min;
            }
            return animeData.episodes <= max;
        }
        case ClueType.WORDS_IN_TITLE: {
            const { number, min, max } = value;

            const romajiTitleLength = animeData.title.romaji.split(" ").length;
            const hasEnglishTitle = animeData.title.english != null;
            const englishTitleLength = animeData.title.english.split(" ").length;

            if (number) {
                return romajiTitleLength === number || (hasEnglishTitle && englishTitleLength === number);
            } else if (min) {
                return romajiTitleLength >= min || (hasEnglishTitle && englishTitleLength >= min);
            } else {
                return romajiTitleLength <= max || (hasEnglishTitle && englishTitleLength <= max);
            }
        }
        case ClueType.FIRST_LETTER: {
            const { min, max } = value;
            const firstLetterRomaji = animeData.title.romaji.charAt(0).toUpperCase();
            const hasEnglishTitle = animeData.title.english != null;
            const firstLetterEnglish = animeData.title.english?.charAt(0).toUpperCase();

            return (firstLetterRomaji >= min && firstLetterRomaji <= max) || (hasEnglishTitle && (firstLetterEnglish >= min && firstLetterEnglish <= max));
        }
        case ClueType.TAG:
            // might also want to add tag rank filter idk
            return animeData.tags.filter((tag: any) => !tag.isMediaSpoiler).some((tag: any) => tag.name === value);
        default:
            throw new Error("Bad clue type! CRINGE!!!")
    }
}

export default checkClueAgainstData;
import { Clue, ClueType } from "./types";

const checkClueAgainstData = (clue: Clue, guessData: any): boolean => {
    const { type, data } = clue;
    const animeData = guessData.data.Media;

    switch (type) {
        case ClueType.GENRE:
            return animeData.genres.includes(data)
        case ClueType.SOURCE:
            return animeData.source === data;
        case ClueType.FORMAT:
            return animeData.format === data;
        case ClueType.STUDIO:
            return animeData.studios.nodes.some((node: any) => node.name === data);
        case ClueType.VOICE_ACTOR:
            return animeData.characters.edges.some((edge: any) => edge.voiceActors.some((voiceActor: any) => voiceActor.name.full === data))
        case ClueType.YEAR: {
            const { min, max } = data;
            // feel like this logic could be simplified
            if (min && max) {
                return animeData.seasonYear > min && animeData.seasonYear < max;
            } else if (min) {
                return animeData.seasonYear > min
            }
            return animeData.seasonYear < max;
        }
        case ClueType.EPISODES: {
            const { min, max } = data;
            // feel like this logic could be simplified
            if (min && max) {
                return animeData.episodes >= min && animeData.episodes <= max;
            } else if (min) {
                return animeData.episodes >= min;
            }
            return animeData.episodes <= max;
        }

        case ClueType.WORDS_IN_TITLE:
            const { number, min, max } = data;
            const romajiTitleLength = animeData.title.romaji.split(" ").length;
            const englishTitleLength = animeData.title.english.split(" ").length;
            if (number) {
                return romajiTitleLength === number || englishTitleLength === number;
            } else if (min) {
                return romajiTitleLength >= min || englishTitleLength >= min;
            } else {
                return romajiTitleLength <= max || englishTitleLength <= max;
            }
        case ClueType.TAG:
            // might also want to add tag rank filter idk
            return animeData.tags.filter((tag: any) => !tag.isMediaSpoiler).some((tag: any) => tag.name === data);
        default:
            throw new Error("Bad clue type! CRINGE!!!")
    }
}

export default checkClueAgainstData;
import { Clue, ClueType } from "./types";

const checkClueAgainstData = (clue: Clue, guessData: any): boolean => {
    const { type, data } = clue;
    const animeData = guessData.data.Media;

    switch (type) {
        case ClueType.GENRE:
            return animeData.genres.includes(data)
        case ClueType.ORIGINAL:
            return animeData.source === "ORIGINAL";
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
        case ClueType.MOVIE:
            return animeData.format === "MOVIE";
        default:
            throw new Error("Bad clue type! CRINGE!!!")
    }
}

export default checkClueAgainstData;
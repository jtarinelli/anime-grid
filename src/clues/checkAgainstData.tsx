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
            return animeData.studios.nodes.some(node => node.name === data);
        case ClueType.VOICE_ACTOR:
            console.log(animeData);
            return animeData.characters.edges.some(edge => edge.voiceActors.some(voiceActor => voiceActor.name.full === data))
        case ClueType.YEAR:
            const { start, end } = data;
            // feel like this logic could be simplified
            if (start && end) {
                return animeData.seasonYear > start && animeData.seasonYear < end;
            } else if (start) {
                return animeData.seasonYear > start
            }
            return animeData.seasonYear < end;
        case ClueType.EPISODES:
            const { min, max } = data;
            // feel like this logic could be simplified
            if (min && max) {
                return animeData.episodes > min && animeData.episodes < max;
            } else if (min) {
                return animeData.episodes > min;
            }
            return animeData.episodes < max;
        case ClueType.MOVIE:
            return animeData.format === "MOVIE";
        default:
            throw new Error("Bad clue type! CRINGE!!!")
    }
}

export default checkClueAgainstData;
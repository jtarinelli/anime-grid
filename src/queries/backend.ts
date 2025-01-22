import { Clue } from "../clues/types"
import { Anime } from "./animeSearch"

const queryBackend = async (url: string, body?: any) => {
    const response = await fetch(
        `http://localhost:3000/${url}`,
        {
            method: body ? "POST" : undefined,
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
    )
    return response.json()
}

export const getGame = async (mode: string) => {
    return queryBackend(`game/${mode}`)
}

export const sendGuess = async (anime: Anime, gameId: number, clues: Clue[]) => {
    return queryBackend('guess', {
        guessedAnimeId: anime.id,
        gameId,
        clue1Id: clues[0].id,
        clue2Id: clues[1].id,
    })
}
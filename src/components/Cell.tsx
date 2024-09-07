import { FC, useState } from "react"
import Search from "./Search";
import { Anime } from "../queries/animeSearch";
import { Clue } from "../clues/types";
import { useQuery } from "@tanstack/react-query";
import { animePosterQuery } from "../queries/animePoster";
import { CellCoordinates, Guess } from "../App";
import request from "graphql-request";

type CellProps = {
    coordinates: CellCoordinates;
    clues: Clue[];
    correctedlyGuessedAnime: Anime | null;
    isAlreadyGuessed: (animeId: number) => boolean;
    addGuess: (newGuess: Guess) => void;
    isGameOver: boolean;
}

const Cell: FC<CellProps> = ({
    coordinates,
    clues,
    correctedlyGuessedAnime,
    isAlreadyGuessed,
    addGuess,
    isGameOver
}) => {
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const onClick = () => { !correctedlyGuessedAnime && setShowSearch(true) }

    const { data } = useQuery({
        queryKey: ['poster', correctedlyGuessedAnime?.id],
        queryFn: async () => request(
            import.meta.env.VITE_ANILIST_GRAPHQL_URL,
            animePosterQuery,
            { id: correctedlyGuessedAnime?.id ?? 0 },
        ),
        enabled: correctedlyGuessedAnime?.id !== undefined,
        staleTime: Infinity,
    });

    // images get stretched sometimes
    // would like background-image cover but they're not background images...
    return (
        <div
            className={`h-full w-full min-w-0 p-0 bg-slate-100 ${(!correctedlyGuessedAnime && !isGameOver) && 'hover:bg-slate-200'}`}
            onClick={onClick}
        >
            {correctedlyGuessedAnime && data?.Media?.coverImage?.large ?
                <img src={data.Media.coverImage.large} alt={correctedlyGuessedAnime.title.romaji} className="size-full p-0 m-0"></img>
                : null}
            {(showSearch && !isGameOver) ?
                <Search
                    cellCoordinates={coordinates}
                    clues={clues}
                    setShowSearch={setShowSearch}
                    onMakeGuess={addGuess}
                    isAlreadyGuessed={isAlreadyGuessed}
                />
                : null}
        </div>
    )
}

export default Cell;
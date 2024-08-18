import { FC, useState } from "react"
import Search from "./Search";
import { Anime } from "../queries/animeSearch";
import { Clue } from "../clues/types";
import { useQuery } from "@tanstack/react-query";
import { animePosterQuery } from "../queries/animePoster";

type CellProps = {
    clues: Clue[];
    addGuess: Function;
    isGameOver: boolean;
}

const Cell: FC<CellProps> = ({ clues, addGuess, isGameOver }) => {
    const [correctGuess, setCorrectGuess] = useState<Anime>();
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const onClick = () => {!correctGuess && setShowSearch(true)}

    const { data } = useQuery({
        queryKey: ['poster', correctGuess?.id],
        queryFn: () => animePosterQuery(correctGuess?.id)
    });

    // prob add loading thing for image
    // images don't fit nice in the cells (get squished horizontally but don't expand either)
    // would like background-image cover but they're not background images...
    return (
        <div className={`h-full w-full min-w-0 border-2 ${(!correctGuess && !isGameOver) && 'hover:bg-slate-100'}`} onClick={onClick}>
            {correctGuess && data ? <img src={data.data.Media.coverImage.large} className="h-full"></img> : null}
            {(showSearch && !isGameOver) ? <Search clues={clues} setShowSearch={setShowSearch} setCorrectGuess={setCorrectGuess} addGuess={addGuess}/> : null}
        </div>
    )
}

export default Cell;
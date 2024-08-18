import { FC, useState } from "react"
import Search from "./Search";
import { Anime } from "../queries/animeSearch";
import { Clue } from "../clues/types";
import { useQuery } from "@tanstack/react-query";
import { animePosterQuery } from "../queries/animePoster";

type CellProps = {
    clues: Clue[];
}

const Cell: FC<CellProps> = ({ clues }) => {
    const [correctGuess, setCorrectGuess] = useState<Anime>();
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const onClick = () => {!correctGuess && setShowSearch(true)}

    const { data } = useQuery({
        queryKey: ['poster', correctGuess?.id],
        queryFn: () => animePosterQuery(correctGuess?.id)
    });
    
    // prob add loading thing for image
    return (
        <div className={`h-full w-full min-w-0 border-2 ${!correctGuess && 'hover:bg-slate-100'}`} onClick={onClick}>
            {correctGuess && data ? <img src={data.data.Media.coverImage.large} className="h-full"></img> : null}
            {showSearch ? <Search clues={clues} setShowSearch={setShowSearch} setCorrectGuess={setCorrectGuess}/> : null}
        </div>
    )
}

export default Cell;
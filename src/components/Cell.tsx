import { FC, useState } from "react"
import { Clue } from "../clues";
import Search from "./Search";
import { Anime } from "../queries/animeSearch";

type CellProps = {
    clues: Clue[];
}

const Cell: FC<CellProps> = ({ clues }) => {
    const [correctGuess, setCorrectGuess] = useState<Anime>();
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const onClick = () => {!correctGuess && setShowSearch(true)}

    return (
        <div className={`h-full w-full min-w-0 border-2 ${!correctGuess && 'hover:bg-slate-100'}`} onClick={onClick}>
            {correctGuess ? correctGuess.title.romaji : null}
            {showSearch ? <Search clues={clues} setShowSearch={setShowSearch} setCorrectGuess={setCorrectGuess}/> : null}
        </div>
    )
}

export default Cell;
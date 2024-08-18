import { FC, useState } from "react"
import { Clue } from "../clues";
import Search from "./Search";

type CellProps = {
    clues: Clue[];
}

const Cell: FC<CellProps> = ({ clues }) => {
    const [showSearch, setShowSearch] = useState<boolean>(false);

    return (
        <div className="h-full w-full min-w-0 border-2 hover:bg-slate-100" onClick={() => setShowSearch(true)}>
            {showSearch ? <Search clues={clues} setShowSearch={setShowSearch}/> : null}
        </div>
    )
}

export default Cell;
import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { checkGuess } from "../clues/checkGuess";
import { Clue } from "../clues/types";
import { CellCoordinates, Guess } from "../App";
import request from "graphql-request";
import { Anime, animeSearchQuery } from "../queries/animeSearch";

type SearchProps = {
    cellCoordinates: CellCoordinates;
    clues: Clue[];
    setShowSearch: Function;
    isAlreadyGuessed: (animeId: number) => boolean;
    onMakeGuess: (newGuess: Guess) => void;
}

const Search: FC<SearchProps> = ({ cellCoordinates, clues, setShowSearch, onMakeGuess, isAlreadyGuessed }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selection, setSelection] = useState<Anime | null>(null); // maybe should be ref

    const { data } = useQuery({
        queryKey: ['search', searchTerm],
        queryFn: async () => request(
            import.meta.env.VITE_ANILIST_GRAPHQL_URL,
            animeSearchQuery,
            { searchTerm }
        ),
        enabled: searchTerm !== "",
    });

    console.log(data);

    const onClose = (event: any) => {
        event.stopPropagation();
        setShowSearch(false);
    }

    const onType = debounce((event) => setSearchTerm(event.target.value), 600)

    // this gets called on typing and selecting, which is a problem
    // should be on select/click only since if only typing we don't know the id
    const onSelect = (event: any) => {
        if (data) {
            const romajiTitle = event.target.value;
            const guess = data?.Page?.media?.find(anime => anime?.title?.romaji === romajiTitle);
            if (!guess) {
                setSelection(null);
                return;
            }
            setSelection(guess)
        }
    };

    const onSubmit = async () => {
        if (selection) {
            if (!isAlreadyGuessed(selection.id)) {
                const isCorrectGuess = await checkGuess(selection.id, clues);
                onMakeGuess({ anime: selection, isCorrect: isCorrectGuess, cellCoordinates });
                if (isCorrectGuess) {
                    setShowSearch(false);
                } else {
                    setSelection(null);
                    setSearchTerm("");
                }
            }
        }
    }

    const uniqueId = `search-${JSON.stringify(cellCoordinates)}`;

    // sometimes the request returns data but dropdown doesn't show up? why?

    // might look nicer/be easier to do own thing instead of datalist
    // need to make list/datalist id unique across searches for it to work
    // although should probably just change the search to be a popup instead of in the box cause its weird
    return (
        <div className="h-full p-1 flex flex-col justify-evenly bg-slate-100">
            <button onClick={onClose} className="border-2 hover:bg-slate-200" >X</button>
            <input
                type="text"
                list={uniqueId}
                onChange={onType}
                onInput={onSelect}
                className="border-2"
            />
            {data?.Page?.media && (<datalist id={uniqueId}>
                {data.Page.media.map((anime) =>
                    <option value={anime?.title?.romaji} key={anime?.id}>{anime?.title?.english}</option>
                )}
            </datalist>)}
            <button onClick={onSubmit} className="border-2 hover:bg-slate-200">Guess</button>
        </div>
    )
}

export default Search;
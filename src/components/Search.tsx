import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Anime, animeSearchQuery } from "../queries/animeSearch";
import debounce from "lodash/debounce";
import { checkGuess } from "../clues/checkGuess";
import { Clue } from "../clues/types";

type SearchProps = {
    clues: Clue[];
    setShowSearch: Function;
    setCorrectGuess: Function;
    addGuess: Function;
}

const Search: FC<SearchProps> = ({ clues, setShowSearch, setCorrectGuess, addGuess }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selection, setSelection] = useState<Anime | null>(null); // maybe should be ref

    const { data } = useQuery({
        queryKey: ['search', searchTerm],
        queryFn: () => animeSearchQuery(searchTerm)
    });

    const onClose = (event: any) => {
        event.stopPropagation();
        setShowSearch(false);
    }

    const onType = debounce((event) => setSearchTerm(event.target.value), 500)

    // this gets called on typing and selecting, which is a problem
    // should be on select/click only since if only typing we don't know the id
    const onSelect = (event: any) => {
        if (data) {
            const romajiTitle = event.target.value;
            const guess = data.data.Page.media.find(anime => anime.title.romaji === romajiTitle);
            if (!guess) {
                setSelection(null);
                return;
            }
            setSelection(guess)
        }
    };

    const onSubmit = async () => {
        if (selection) {
            const guessAdded = addGuess(selection);
            if (guessAdded) {
                const isCorrectGuess = await checkGuess(selection.id, clues);
                if (isCorrectGuess) {
                    setCorrectGuess(selection);
                    setShowSearch(false);
                } else {
                    setSelection(null);
                    setSearchTerm("");
                }
            }
        }
    }

    const uniqueId = clues.map(clue => JSON.stringify(clue.data)).join("-");

    // might look nicer/be easier to do own thing instead of datalist
    // need to make list/datalist id unique across searches for it to work
    // although should probably just change the search to be a popup instead of in the box cause its weird
    return (
        <div className="h-full p-10 flex flex-col justify-evenly bg-slate-100">
            <button onClick={onClose} className="border-2 hover:bg-slate-200" >X</button>
            <input type="text" list={`guess-${uniqueId}`} onChange={onType} onInput={onSelect} className="border-2" />
            {data ? (<datalist id={`guess-${uniqueId}`}>
                {data.data.Page.media.map((anime: any) =>
                    <option value={anime.title.romaji} key={anime.id}>{anime.title.english}</option>
                )}
            </datalist>) : null}
            <button onClick={onSubmit} className="border-2 hover:bg-slate-200">Guess</button>
        </div>
    )
}

export default Search;
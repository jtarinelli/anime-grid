import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash/debounce";
import { checkGuess } from "../clues/checkGuess";
import { Clue } from "../clues/types";
import request from "graphql-request";
import { Anime, animeSearchQuery } from "../queries/animeSearch";
import { buttonClass } from "../classes";
import Popup from "./Popup";
import getClueString from "../clues/getClueString";
import { CellCoordinates, Guess } from "./Game";

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
                    setShowSearch(false);
                }
            }
        }
    }

    const uniqueId = `search-${JSON.stringify(cellCoordinates)}`;

    // sometimes the request returns data but dropdown doesn't show up? why?
    // might look nicer/be easier to do own thing instead of datalist
    // need to make list/datalist id unique across searches for it to work
    return (
        <Popup onClose={onClose}>
            <div className="h-full p-1 flex flex-col justify-evenly">
                <h2 className='text-lg'>{`${clues.map(clue => getClueString(clue)).join(' x ')}`}</h2>
                <br />
                <input
                    type="text"
                    list={uniqueId}
                    onChange={onType}
                    onInput={onSelect}
                    className="border-2 p-2"
                    autoFocus
                />
            <br/>
            {data?.Page?.media && (<datalist id={uniqueId}>
                        {data.Page.media.filter(anime => !!anime).map((anime) =>
                            <option value={anime?.title?.romaji} key={anime?.id}>{anime?.title?.english}</option>
                        )}
            </datalist>)}
            <button onClick={onSubmit} className={buttonClass + " border-2"}>Guess</button>
            </div>
        </Popup>
    )
}

export default Search;
import { FC, useState } from "react";
import { Clue } from "../clues";
import { useQuery } from "@tanstack/react-query";
import { animeSearchQuery } from "../queries/animeSearch";
import debounce from "lodash/debounce";
import { checkGuess } from "../checkGuess";

type SearchProps = {
    clues: Clue[];
    setShowSearch: Function;
}

const Search: FC<SearchProps> = ({ clues, setShowSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null); // maybe should be ref

    const { data } = useQuery({
        queryKey: ['search', searchTerm],
        queryFn: () => animeSearchQuery(searchTerm)
    });

    const onClose = (event: any) => {
        event.stopPropagation();
        setShowSearch(false);
    }
    const onType = debounce((event) => setSearchTerm(event.target.value), 500);
    const onSelect = (event: any) => {
        if (data) {
            const romajiTitle = event.target.value;
            const selectedAnime = data.data.Page.media.find(anime => anime.title.romaji === romajiTitle);
            if (!selectedAnime) {
                setSelectedAnimeId(null);
                return;
            }
            setSelectedAnimeId(selectedAnime.id)
        }
    };

    const onSubmit = async () => {
        if (selectedAnimeId) {
            const correctGuess = await checkGuess(selectedAnimeId, clues);
            alert(`Guess is ${correctGuess ? '' : 'not '}correct`);
        }
    }

    // might look nicer/be easier to do own thing instead of datalist
    // need to make list/datalist id unqiue across searches for it to work
    // although should probably just change the search to be a popup instead of in the box cause its weird
    return (
        <div className="h-full p-10 flex flex-col justify-evenly bg-slate-100">
            <button onClick={onClose} className="border-2 hover:bg-slate-200" >X</button>
            <input type="text" list="guess" onChange={onType} onInput={onSelect} className="border-2" />
            {data ? (<datalist id="guess">
                {data.data.Page.media.map((anime: any) =>
                    <option value={anime.title.romaji} key={anime.id}>{anime.title.english}</option>
                )}
            </datalist>) : null}
            <button onClick={onSubmit} className="border-2 hover:bg-slate-200">Guess</button>
        </div>
    )
}

export default Search;
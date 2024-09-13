import { FC, useCallback, useState } from "react";
import { checkGuess } from "../clues/checkGuess";
import { Clue } from "../clues/types";
import request from "graphql-request";
import { Anime, animeSearchQuery } from "../queries/animeSearch";
import Popup from "./Popup";
import getClueString from "../clues/getClueString";
import { CellCoordinates, Guess } from "./Game";
import Button from "./Button";
import AsyncSelect from 'react-select/async';
import { debounce } from "lodash";

type SearchProps = {
    cellCoordinates: CellCoordinates;
    clues: Clue[];
    setShowSearch: Function;
    isAlreadyGuessed: (animeId: number) => boolean;
    onMakeGuess: (newGuess: Guess) => void;
}

const Search: FC<SearchProps> = ({ cellCoordinates, clues, setShowSearch, onMakeGuess, isAlreadyGuessed }) => {
    const [selection, setSelection] = useState<Anime | null>(null); // maybe should be ref

    const onClose = (event: any) => {
        event.stopPropagation();
        setShowSearch(false);
    }

    const loadOptions = useCallback(
        debounce((searchTerm, callback) => {
            getOptions(searchTerm).then((options) => callback(options));
        }, 500),
        []
    );

    const getOptions = async (searchTerm: string) => {
        const data = await request(
            import.meta.env.VITE_ANILIST_GRAPHQL_URL,
            animeSearchQuery,
            { searchTerm }
        );

        return data?.Page?.media?.filter(anime => !!anime)
            .map((anime) => { return { value: anime?.id ?? '', label: `${anime?.title?.romaji}${anime.title?.english && anime.title.english !== anime.title.romaji ? ` (${anime.title.english})` : ''}` } }
            )
    }

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

    const onChange = (option: any) => {
        // idk if title is actually needed
        setSelection({ id: option.value, title: { romaji: option.label, english: '' } });
    }

    return (
        <Popup onClose={onClose}>
            <div className="h-full p-1 flex flex-col justify-evenly">
                <h2 className='text-lg'>{`${clues.map(clue => getClueString(clue)).join(' x ')}`}</h2>
                <br />
                <form onSubmit={(event: any) => { event.preventDefault(); onSubmit() }}>
                    <AsyncSelect
                        loadOptions={loadOptions}
                        onChange={onChange}
                        autoFocus
                        cacheOptions
                        unstyled
                        classNames={{
                            control: () => 'relative border-2 border-neutral-300 p-2 bg-background',
                            menu: () => 'absolute z-10 bg-background',
                            option: (state) => state.isFocused ? 'p-2 hover:bg-neutral-100 bg-neutral-200' : 'p-2 hover:bg-neutral-100',
                            noOptionsMessage: () => 'absolute bg-background',
                            loadingMessage: () => 'absolute bg-background',
                        }}
                    />
                    <br />
                    <Button label="Guess" onClick={onSubmit} />
                </form>
            </div>
        </Popup>
    )
}

export default Search;
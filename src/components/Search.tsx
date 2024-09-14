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
            .map((anime) => { return { value: anime?.id ?? '', label: `${anime?.title?.romaji}${anime.title?.english && anime.title.english?.toUpperCase() !== anime.title.romaji?.toUpperCase() ? `\n(${anime.title.english})` : ''}` } }
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
        if (option) {
            const titles = option.label.split('\n');
            const englishTitle = titles[1] ? titles[1].substring(1, titles[1].length - 1) : '';
            setSelection({ id: option.value, title: { romaji: titles[0], english: englishTitle } });
        } else {
            setSelection(null);
        }
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
                        isClearable
                        placeholder='Search for something'
                        menuPortalTarget={document.body}
                        classNames={{
                            control: () => 'relative border-2 border-neutral-300 p-2 bg-background',
                            menu: (state) => state.options.length > 0 ? 'absolute z-10 bg-background border-2 border-t-0 border-neutral-300 whitespace-pre-wrap' : '',
                            option: (state) => state.isFocused ? 'p-2 hover:bg-neutral-100 bg-neutral-200' : 'p-2 hover:bg-neutral-100',
                            menuPortal: () => 'z-100',
                            noOptionsMessage: () => 'absolute bg-background',
                            loadingMessage: () => 'absolute bg-background',
                            placeholder: () => 'text-neutral-700',
                        }}
                        styles={{
                            indicatorsContainer: () => ({
                                "svg": {
                                    // neutral-700
                                    fill: '#554C44',
                                }
                            }),
                            dropdownIndicator: () => ({
                                display: 'none',
                            })
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
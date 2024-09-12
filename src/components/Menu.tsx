import { FC, useState } from "react";
import { Rules } from "./Rules";
import { Mode } from "../clues/generateClues";

export const modeOptions = [
    { name: 'Normal', type: Mode.HALF_VOICE_ACTORS },
    { name: 'Baby', type: Mode.BABY },
    { name: 'Voice actors', type: Mode.ALL_VOICE_ACTORS },
    { name: 'Random', type: Mode.ALL_RANDOM },
  ]

interface MenuProps {
    mode: Mode,
    onUpdateMode: (mode: Mode) => void;
}

const Menu: FC<MenuProps> = ({ mode, onUpdateMode }) => {
    const [showRules, setShowRules] = useState<boolean>(false);
    const [showGameModes, setShowGameModes] = useState<boolean>(false);

    const currentModeName = modeOptions.find(option => option.type === mode)?.name;

    return <>
        <div className='hor:h-full hor:place-self-start hor:min-w-60 bg-accent-300'>
            <ul className='flex hor:flex-col justify-evenly align-items-center'>
                <li key='title'><h1 className='text-lg hor:text-xl p-4 hor:p-6 text-center font-medium'>Anime Grid</h1></li>
                <a onClick={() => setShowRules(true)} className="cursor-pointer" key='rules'>
                    <li className='p-4 h-full hover:bg-accent-400'>Rules</li>
                </a>
                <a onClick={() => setShowGameModes(!showGameModes)} key="mobile-modes">
                    <li className='p-4 h-full hover:bg-accent-400 hor:hidden'>Mode: {currentModeName}
                        <ul className={`absolute${!showGameModes ? ' hidden' : ''} bg-accent-300 mt-4 -ml-4`}>
                            {modeOptions.map(option =>
                                <a onClick={() => onUpdateMode(option.type)} className="cursor-pointer" key={option.type}>
                                    <li className='p-4 hover:bg-accent-400'>{option.name}</li>
                                </a>
                            )}
                        </ul>
                    </li>
                </a>
                <ul className={`hidden hor:block`} key='desktop-modes'>
                    <li className='ps-4' key="divider">---</li>
                    {modeOptions.map(option =>
                        <a onClick={() => onUpdateMode(option.type)} className="cursor-pointer" key={option.type}>
                            <li className={`p-4 hover:bg-accent-400 ${option.type === mode ? 'bg-accent-400' : ''}`}>
                                {option.name}
                            </li>
                        </a>
                    )}
                </ul>
            </ul>
        </div>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
    </>
}

export default Menu;
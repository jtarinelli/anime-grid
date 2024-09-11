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
        <div className='md:h-full md:place-self-start md:min-w-60 bg-accent-200'>
            <ul className='flex md:flex-col justify-evenly align-items-center'>
                <li><h1 className='text-lg md:text-xl p-4 md:p-6 text-center font-medium'>Anime Grid</h1></li>
                <a onClick={() => setShowRules(true)} className="cursor-pointer">
                    <li className='p-4 h-full hover:bg-accent-300'>Rules</li>
                </a>
                <a onClick={() => setShowGameModes(!showGameModes)}>
                    <li className='p-4 h-full hover:bg-accent-300 md:hidden'>Mode: {currentModeName}
                        <ul className={`absolute${!showGameModes ? ' hidden' : ''} bg-accent-300 mt-2`}>
                            {modeOptions.map(option =>
                                <a onClick={() => onUpdateMode(option.type)} className="cursor-pointer">
                                    <li className='p-4 hover:bg-accent-300'>{option.name}</li>
                                </a>
                            )}
                        </ul>
                    </li>
                </a>
                <ul className={`hidden md:block`}>
                    <li className='ps-4'>---</li>
                    {modeOptions.map(option =>
                        <a onClick={() => onUpdateMode(option.type)} className="cursor-pointer">
                            <li className={`p-4 hover:bg-accent-300 ${option.type === mode ? 'bg-accent-300' : ''}`}>
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
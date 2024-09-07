import { FC, useState } from "react";
import { Rules } from "./Rules";
import { Mode } from "../clues/generateClues";

interface MenuProps {
    mode: Mode,
    onUpdateMode: (mode: Mode) => void;
}

const Menu: FC<MenuProps> = ({ mode, onUpdateMode }) => {
    const [showRules, setShowRules] = useState<boolean>(false);
    const [showGameModes, setShowGameModes] = useState<boolean>(false);

    const modeOptions = [
        { name: 'Normal', type: Mode.HALF_VOICE_ACTORS },
        { name: 'Baby', type: Mode.BABY },
        { name: 'Voice actors', type: Mode.ALL_VOICE_ACTORS },
        { name: 'Random', type: Mode.ALL_RANDOM },
    ]

    const currentModeName = modeOptions.find(option => option.type === mode)?.name;

    return <>
        <div className='md:h-full md:place-self-start md:min-w-40 bg-slate-100'>
            <ul className='flex md:flex-col justify-evenly align-bottom'>
                <li><h1 className='text-lg p-4'>Anime Grid</h1></li>
                <li className='p-4'><a onClick={() => setShowRules(true)} className="cursor-pointer">Rules</a></li>
                <li className='p-4 md:hidden'><a onClick={() => setShowGameModes(!showGameModes)}>Mode: {currentModeName} v</a>
                    <ul className={`absolute${!showGameModes ? ' hidden' : ''} bg-slate-100 p-4 border-2 mt-2`}>
                        {modeOptions.map(option =>
                            <li className='mb-2'><a onClick={() => onUpdateMode(option.type)} className="cursor-pointer">{option.name}</a></li>
                        )}
                    </ul>
                </li>
                <ul className={`hidden md:block`}>
                    <li className='ps-4'>---</li>
                    <li className='p-4'>Mode:</li>
                    {modeOptions.map(option =>
                        <li className={`p-4 ${option.type === mode ? 'bg-slate-200' : ''}`}><a onClick={() => onUpdateMode(option.type)} className="cursor-pointer">{option.name}</a></li>
                    )}
                </ul>
            </ul>
        </div>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
    </>
}

export default Menu;
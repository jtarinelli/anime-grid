import { FC, useState } from "react";
import { Rules } from "./Rules";

const Menu: FC = () => {
    const [showRules, setShowRules] = useState<boolean>(false);
    const [showGameModes, setShowGameModes] = useState<boolean>(false);

    // make the game mode say current mode (mode: normal) 
    // (is it clear that it's changable tho? need lil dropdown symbol?)
    return <>
        <div className='md:h-full md:place-self-start p-6 md:p-8 bg-slate-100'>
            <ul className='flex md:flex-col justify-evenly align-bottom'>
                <li><h1 className='text-lg md:mb-10'>Anime Grid</h1></li>
                <li className='md:mb-4'><a onClick={() => setShowRules(true)}>Rules</a></li>
                <li className='md:mb-4 md:hidden'><a onClick={() => setShowGameModes(!showGameModes)}>Mode: Normal v</a>
                <ul className={`absolute${!showGameModes ? ' hidden' : ''} bg-slate-100 p-4 border-2 mt-2`}>
                    <li className='mb-2'>Normal</li>
                    {/* <li className='mb-2'>Voice actors</li>
                    <li className=''>Random</li> */}
                </ul>
                </li>
                <ul className={`hidden md:block`}>
                    <li className='mb-4'>Mode:</li>
                    <li className='mb-4'>Normal</li>
                    {/* <li className='mb-4'>Voice actors</li>
                    <li className='mb-4'>Random</li> */}
                </ul>
            </ul>
        </div>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
    </>
}

export default Menu;
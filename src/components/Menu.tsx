import { FC, useState } from "react";
import { Rules } from "./Rules";

const Menu: FC = () => {
    const [showRules, setShowRules] = useState<boolean>(false);

    // make the game mode a label on big screen, clickable dropdown on mobile
    return <>
        <div className='md:h-full md:place-self-start p-6 md:p-8 bg-slate-100'>
            <h1 className='text-lg md:mb-10'>Anime Grid</h1>
            <ul className='flex md:flex-col justify-evenly'>
                <li className='md:mb-4'><a onClick={() => setShowRules(true)}>Rules</a></li>
                {/* <li className='md:mb-4'><p>Game modes</p></li>
                <li>Normal</li>
                <li>Normal</li>
                <li>Normal</li> */}
            </ul>
        </div>
        {showRules && <Rules onClose={() => setShowRules(false)} />}
    </>
}

export default Menu;
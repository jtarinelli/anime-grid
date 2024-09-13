import { FC } from "react"
import Popup from "./Popup"

interface RulesProps {
    onClose: () => void;
}

export const Rules: FC<RulesProps> = ({ onClose }) => {
    return <Popup onClose={onClose} title="Rules">
        <ul className="list-disc list-inside text-left">
            <li className='mb-2'>Click on a cell to search for an anime that satisfies the clues for that row and column.</li>
            <li className='mb-2'>You get nine guesses total, including incorrect ones.</li>
            <li className='mb-2'>Correct guesses can't be reused.</li>
            <li className='mb-2'>Movies are considered incorrect guesses for clues about the number of episodes.</li>
            <li className='mb-2'>Words are only counted as separate if separated by a space, any other character like a dash doesn't count. For example "Mahou Shoujo Madoka★Magica" is considered three words.</li>
            <li className='mb-2'>Clues relating to anime titles are checked against the romaji version of the Japanese title, plus the official English version if there is one. For example "Kuragehime" counts as a one word title even though the English title "Princess Jellyfish" is two words. If in doubt, both versions are displayed in the dropdown.</li>
        </ul>
    </Popup>
}
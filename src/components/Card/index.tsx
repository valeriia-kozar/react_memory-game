import { ReactNode } from 'react';
import './index.css'

interface IProps {
    children: ReactNode;
    onClick: () => void
    isOpen: boolean;
    // void означает что фн ничего не возращает
} 
// у пропса есть чилдрен

const Card = ({ children, onClick, isOpen }: IProps) => {
    return (
        <div className='card__item' onClick={onClick}>
            {isOpen ? children : '?'}
        </div>
    )
}

export default Card;
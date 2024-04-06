import StatsBlock from "./StatsBlock";
import "./Stats.css";
import { calcCards } from "../js/general";

const Stats = ({cardsInfo}) => {
    return (
        <div className="stats-container">
            <StatsBlock 
                type="Total Cards"
                info={cardsInfo.displayedCards ? cardsInfo.displayedCards.length : 0}/>
            <StatsBlock 
                type="Creatures"
                info={calcCards(cardsInfo, 'Creature', 'type')}/>
            <StatsBlock 
                type="Sorceries"
                info={calcCards(cardsInfo, 'Sorcery', 'type')}/>
            <StatsBlock 
                type="Enchantments"
                info={calcCards(cardsInfo, 'Enchantment', 'type')}/>
            <StatsBlock 
                type="Other"
                info={calcCards(cardsInfo, 'other', 'type')}/>
        </div>
    );
}

export default Stats;
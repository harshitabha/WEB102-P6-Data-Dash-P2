import StatsBlock from "./StatsBlock";
import "./Stats.css";

const Stats = ({cardsInfo, calcCards}) => {
    return (
        <div className="stats-container">
            <StatsBlock 
                type="Total Cards"
                info={cardsInfo.displayedCards ? cardsInfo.displayedCards.length : 0}/>
            <StatsBlock 
                type="Creatures"
                info={calcCards('Creature', 'type')}/>
            <StatsBlock 
                type="Sorceries"
                info={calcCards('Sorcery', 'type')}/>
            <StatsBlock 
                type="Enchantments"
                info={calcCards('Enchantment', 'type')}/>
            <StatsBlock 
                type="Other"
                info={calcCards('other', 'type')}/>
        </div>
    );
}

export default Stats;
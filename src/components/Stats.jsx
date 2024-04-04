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
                info={calcCards('Creature')}/>
            <StatsBlock 
                type="Sorceries"
                info={calcCards('Sorcery')}/>
            <StatsBlock 
                type="Enchantments"
                info={calcCards('Enchantment')}/>
            <StatsBlock 
                type="Other"
                info={calcCards('other')}/>
        </div>
    );
}

export default Stats;
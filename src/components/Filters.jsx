import BubbleSelect from "./BubbleSelect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import "./Filters.css";

const Filters = ({handleChange, filterVar, loadCards, bubbleOptions, searchVal}) => {
    return (
      <div className="filter-container dash-elem">
        <div className="select-container filter">
          <label htmlFor="selectType" className="filter-label">Card Type</label>
          <br />
          <select name="selectType" id="selectType" onChange={(e) => {handleChange(e)}}>
            <option defaultValue={"all"} value="all" className="select-option">All</option>
            <option value="creature" className="select-option">Creature</option>
            <option value="sorcery" className="select-option">Sorcery</option>
            <option value="enchantment" className="select-option">Enchantment</option>
            <option value="other" className="select-option">Other</option>
          </select>
        </div>
        
        <BubbleSelect 
          label="Minimum Power"
          options={bubbleOptions}
          type="power"
          active={filterVar.power}
          handleClick={handleChange}
          bOptionClasses = "power"
          classes="filter"/>
        
        <BubbleSelect 
          label="Minimum Toughness"
          options={bubbleOptions}
          type="tough"
          active={filterVar.tough}
          handleClick={handleChange}
          bOptionClasses = "tough"
          classes="filter"/>

        <div className="refresh-block filter">
          <label htmlFor="refreshBtn filter-label">Refresh Cards</label>
          <button className="refreshBtn" id="refreshBtn" onClick={loadCards}>
            <FontAwesomeIcon icon={faRotateRight} className="icon"/>
          </button>
        </div>

        <br />
        <div className="searchContainer filter">
          <input 
              type="text" 
              className="search" 
              placeholder="Search..."
              value={filterVar.search} 
              name="search"
              onChange={(e) => {handleChange(e)}}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='icon'/>
        </div>  
      </div>
    );
}

export default Filters;
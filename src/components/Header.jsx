import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import "./Header.css"

const Header = ({showSearch, searchVal, handleChange}) => {
    return (
        <div className="headerContainer">
            <Link
                to="/"
                className="title">Magic the Gathering</Link>
            {/* we only need to have the search in the nav bar for the home page so use a var to control when it's displayed */}
            {showSearch ? 
                <div className="searchContainer">
                    <input 
                        type="text" 
                        className="search" 
                        placeholder="Search..."
                        value={searchVal} 
                        name="search"
                        onChange={(e) => {handleChange(e)}}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className='icon'/>
                </div> : null}
            
        </div>
    );
}

export default Header;
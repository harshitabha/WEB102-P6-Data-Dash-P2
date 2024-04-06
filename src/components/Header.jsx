import { Link } from 'react-router-dom'

import "./Header.css"

const Header = () => {
    return (
        <div className="headerContainer">
            <Link
                to="/"
                className="text title">Magic the Gathering</Link>
            {/* <Link
                to="/data-viz"
                className='text nav-text'>Data Visualization</Link> */}
        </div>
    );
}

export default Header;
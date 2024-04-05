import { Link } from 'react-router-dom'

import "./Header.css"

const Header = () => {
    return (
        <div className="headerContainer">
            <Link
                to="/"
                className="text title">Magic the Gathering</Link>
            <Link
                to="/"
                className="text nav-text">Home</Link>
        </div>
    );
}

export default Header;
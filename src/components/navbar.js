import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/signin'>Login</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Register</Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header;
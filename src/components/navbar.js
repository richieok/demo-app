import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {
    render() {
        const logout = <li><button className="linkButton" onClick={this.props.logOut} type="button">Logout</button></li>
        const signin = <li><Link to='/signin'>Login</Link></li>
        const signup = <li><Link to='/signup'>Register</Link></li>
        const dashboard = <li><Link to='/dashboard'>Dashboard</Link></li>
        return (
            <div className="nav">
                <div id="logo"><h3>Logo</h3></div>
                <ul className="nav-list">
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {(this.props.isLoggedIn) && dashboard}
                    {!this.props.isLoggedIn && signin}
                    {!this.props.isLoggedIn && signup}
                    {(this.props.isLoggedIn) && logout}
                </ul>
            </div>
        )
    }
}

export default Header;
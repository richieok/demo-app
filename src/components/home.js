import React from 'react';

class Home extends React.Component {
    render() {
        let welcomeMsg;
        if(this.props.user){
            const userFirstName = this.props.user.firstname;
            welcomeMsg = <h3>Welcome, {userFirstName}.</h3>
        }
        return (
        <div>
            <div>{this.props.user && welcomeMsg}</div>
            <div><h1>Home</h1></div>
        </div>
            );
    }
}

export default Home;
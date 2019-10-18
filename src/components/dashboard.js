import React from 'react';

class Dashboard extends React.Component {
    componentDidMount(){
        console.log('Dashboard did mount')
    }
    render() {
        return <div><h1>Dashboard</h1></div>
    }
}

export default Dashboard;
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import Dashboard from './components/dashboard';
import SignupForm from './components/register';
import SigninForm from './components/signin';
import NotFound from './components/notfound';
// import Axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      username: ''
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getUser = this.getUser.bind(this);
  }
  componentDidMount(){
    console.log('App did mount');
  }
  getUser(){
    console.log('Get user');
  }
  render(){
    let dashboard;
    if(this.state.isLoggedIn){
      dashboard = <Route path='/dashboard' render={() => <Dashboard />} />
    }
    return (
      <div>
        <Router>
          <Header isLoggedIn={this.state.isLoggedIn}/>
          <Switch>
            <Route path='/' exact render={()=><Home/>}/>
            {this.state.isLoggedIn && dashboard}
            <Route path='/signin' render={()=><SigninForm isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route path='/signup' render={() => <SignupForm isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
        <Footer/>
      </div>
    );
  }
}

export default App;

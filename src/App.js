import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/navbar';
import Home from './components/home';
import Footer from './components/footer';
import Dashboard from './components/dashboard';
import SignupForm from './components/register';
import SigninForm from './components/signin';
import NotFound from './components/notfound';

const homeUrl = 'http://localhost:5000';
const signinUrl = 'http://localhost:5000/auth/signin';
let homeOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
}

const zeroState = {
  isLoggedIn: false,
  username: '',
  redirectTo: null,
  user: {},
  token: null
};

class App extends React.Component {
  constructor(props) {
    super(props);
    //console.log('Constructor')
    const appState = JSON.parse(window.localStorage.getItem('appState'));
    if (appState) {
      // console.log(appState);
      console.log('Found state data in local storage');
      this.state = appState;
    } else {
      this.state = zeroState;
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkHome = this.checkHome.bind(this);
    this.authFunc = this.authFunc.bind(this);
    this.appLogout = this.appLogout.bind(this);
  }
  componentDidMount() {
    console.log('App did mount');
    this.checkHome();
  }
  async checkHome() {
    console.log('Checking home route');
    // console.log(this.state)
    if (this.state.token) {
      homeOptions.headers["authorization"] = this.state.token;
    }
    const response = await fetch(homeUrl, homeOptions);
    let data = await response.json();
    console.log(response.status);
    if(!data.user){
      window.localStorage.removeItem('appState');
      this.setState(zeroState);
    }
    return console.log(data);
  }
  async authFunc(url, data) {
    //console.log(data);
    const response = await fetch(url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      });
    console.log(response.status);
    let recv;
    if (response.ok) {
      recv = await response.json();
      if (recv.success) {
        this.setState({
          token: recv.token,
          redirectTo: recv.redirect,
          isLoggedIn: true
        });
        window.localStorage.setItem('appState', JSON.stringify(this.state));
        return console.log(recv.token);
      }
    }
    recv = await response.json();
    console.log(recv.error);
  }
  appLogout() {
    window.localStorage.removeItem('appState');
    this.setState( zeroState );
  }
  render() {
    let dashboard;
    if (this.state.isLoggedIn) {
      dashboard = <Route path='/dashboard' render={() => <Dashboard />} />
    }
    //console.log(`isLoggedIn: ${this.state.isLoggedIn}\ntoken: ${this.state.token}`);
    return (
      <div>
        <Header isLoggedIn={this.state.isLoggedIn} logOut={this.appLogout} user={this.state.user} />
        <Switch>
          <Route path='/' exact render={() => <Home />} />
          {this.state.isLoggedIn && dashboard}
          <Route path='/signin' render={() => <SigninForm isLoggedIn={this.state.isLoggedIn} auth={this.authFunc} url={signinUrl} />} />
          <Route path='/signup' render={() => <SignupForm isLoggedIn={this.state.isLoggedIn} />} />
          <Route path='/logout' />
          {dashboard}
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;

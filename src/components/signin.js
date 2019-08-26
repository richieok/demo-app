import React from 'react';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';

export default class SigninForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        const name = e.target.name;
        this.setState({[name]: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        const info = {
            username: this.state.username,
            password: this.state.password
        }
        Axios.post('http://localhost:5000/auth', {info})
        .then(res =>{
            const data = res.data;
            console.log(data);
            if (data && data.redirectTo){
                this.setState({ redirectTo: data.redirectTo})
            }
        })
    }
    render(){
        if (this.state.redirectTo){
            return <Redirect to={this.state.redirectTo}/>;
        }
        if (this.props.isLoggedIn){
            return <Redirect to='/dashboard' />;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" />
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
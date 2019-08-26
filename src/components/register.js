import React from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            redirectTo: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(e){
        e.preventDefault();
        //console.log(this.state);
        const info = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password
        };
        Axios.post('http://localhost:5000/auth/signup', {info})
        .then(res =>{
            console.log(res.data);
            const data = res.data;
            if (data && data.redirectTo){
                this.setState({ redirectTo: data.redirectTo});
            }
        })
    }
    handleChange(e){
        const name = e.target.name;
        this.setState({ [name]: e.target.value});
    }
    render(){
        if (this.state.redirectTo){
            return <Redirect to={this.state.redirectTo}/>;
        }
        if (this.props.isLoggedIn) {
            return <Redirect to='/dashboard' />;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="firstname">First Name: </label>
                        <input type="text" name="firstname" onChange={this.handleChange}/>
                        <label htmlFor="lastname">Last Name: </label>
                        <input type="text" name="lastname" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="username">Email: </label>
                        <input type="email" name="username" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm Password: </label>
                        <input type="password" name="confirm-password" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
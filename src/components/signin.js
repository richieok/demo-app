import React from 'react';
import {Redirect} from 'react-router-dom';

export default class SigninForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            redirectTo: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        const name = e.target.name;
        this.setState({[name]: e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.auth(this.props.url, data);
    }
    render(){
        if (this.state.redirectTo){
            return <Redirect to={{pathname :this.state.redirectTo}}/>;
        }
        if (this.props.isLoggedIn){
            return <Redirect to='/dashboard' />;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" className="form-control" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}
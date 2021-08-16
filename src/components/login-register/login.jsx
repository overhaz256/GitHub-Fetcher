import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReUserState } from '../../store/actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '', 
            password: '', 
            errors: ''
        };
    }

    onChange = (e) => {
        this.setState(
            {[e.target.name] : e.target.value});}

    Login = (e) => {
        e.preventDefault();
        this.setState(
            {[e.target.name] : e.target.value});
        const Data = {password:this.state.password, email:this.state.email};
        axios.post(`${this.props.URL_Backend}/Login`, {Data})
        .then((res)=>{
            console.log(res)
            if(res['data'].token){
                //Operación exitosa
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                this.props.ReUserState(true);
                this.props.props.history.push('/Profile');
            }
            if(res['data'].message){
                //Login Fallido
                const err = res.data.message;
                this.setState({errors: err});
            }
        })
        .catch(err=> this.setState({errors: 'Correo o contraseña incorrecto.'}));
    }

    render() {
        return (
            <React.Fragment>
            {
                this.state.errors ? <i className='alert alert-danger' role="alert">
                    {this.state.errors}
                </i>: ''
            }
            <hr></hr>
            <form className="form-signin">
                <h4 className="h3 mb-3 font-weight-normal grey">Iniciar Sesión</h4>
                <input value={this.state.email} onChange={this.onChange} name="email" type="email"  className="form-control" placeholder="E-mail" />
                <input value={this.state.password} onChange={this.onChange} name="password" type="password"  className="form-control" placeholder="Contraseña" />
                <button onClick={this.Login} className="btn btn-md btn-primary btn-block" type="submit">Ingresar</button>
            </form>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    ReUserState: PropTypes.func.isRequired,
    Users: PropTypes.object.isRequired
}

const mapToProps = (state) => ({
    Users:state.Users
});

export default connect(mapToProps, {ReUserState}) (Login);
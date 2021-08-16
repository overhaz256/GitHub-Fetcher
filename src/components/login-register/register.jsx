import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '', 
            email: '', 
            password: '', 
            errors: ''
        };
    }

    onChange = (e) => { 
        this.setState({[e.target.name]: e.target.value});
    }

    Register = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
        const Data = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email
           
        };

        axios.post(`${this.props.URL_Backend}/Register`, {Data})
        .then(res => {
            console.log(res);
            console.log(res.data.message);
            const err = res.data.message;
            this.setState({errors: err});
            if(!err){
                alert("Registro exitoso");
                const em = this.state.email;
                const pass = this.state.password;
                this.setState({emai:em, password:pass
                })
            }
        })
        .catch((err) => {console.log(err)})
    }

    render() {
        return (
            <React.Fragment>
            { this.state.errors ? <i className="alert alert-danger" role="alert">
                {this.state.errors}
            </i> : ''}
            <hr></hr>
            <form class="form-Register">
                <h4 class="h3 mb-3 font-weight-normal grey">¡Registrate!</h4>
                <input value={this.state.name} onChange={this.onChange} name="name" type="text" className="form-control" placeholder="Nombre" />
                <input value={this.state.email} onChange={this.onChange} name="email" type="email"  className="form-control" placeholder="E-mail" />
                <input value={this.state.password} onChange={this.onChange} name="password" type="password"  className="form-control" placeholder="Contraseña" />
                <button onClick={this.Register} className="btn btn-md btn-success btn-block" type="submit">Registrarme</button>
            </form>
            </React.Fragment>
        );
    }
}

export default Register;
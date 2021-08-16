import React, { Component } from 'react';
import Login from './login';
import Register from './register';
import { Link } from 'react-router-dom'; 

const PORT = process.env.PORT || 4000;
const URL_Backend = `http://localhost:${PORT}/api/users`;

class LoginRegister extends Component {
    state = { }
    render(){
        return(
            <React.Fragment>
            <center>
                <section className="Specific">
                    <div className="main" id="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                   <Login props={this.props} URL_Backend={URL_Backend}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </center>
            <center>
                <section className="Specific">
                    <div className="main" id="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                   <Register props={this.props} URL_Backend={URL_Backend}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </center>   
            </React.Fragment>
        );
    }
}

export default LoginRegister;
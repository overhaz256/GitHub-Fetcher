import React, {Component } from 'react';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Data: '',
            checked: false
        };
    }

    handleChange = (e) => {
        this.setState(() => ({
            checked: !this.state.checked
        }));
        console.log(this.state.checked, 'checked');
    }

    Search = (e) => {
        console.log(this.state.Data)
        if(this.state.Data === '') return alert('¡El campo Nombre de Usuario no puede estar vacio!')
        //Si el checkbox está marcado: localhost:3000/Specific/Username
        //Si no está marcado: localhost:3000/Data/Username
        if(this.state.checked) {
            this.props.history.push({
                pathname: `/Specific/${this.state.Data}`,
            });
        }
        else {
            this.props.history.push({
                pathname: `/Data/${this.state.Data}`,
            });
        }
    }
    render() {
        return (
            <React.Fragment>
                <section className="mainPage">
                    <center>
                        <div className="main" id="main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="main__text-container">
                                        <img 
                                        src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" 
                                        className="GitLogo"  
                                        alt=''
                                        />
                                            <h1 className="main__title">
                                                GitFetch - Buscador de Perfil de GitHub
                                            </h1>
                                            <p className="main__subtitle">
                                                Obten información acerca de los repositorios, seguidores y más, solo ingresando el nombre de usuario.
                                            </p>
                                        </div>
                                        <div className="container">
                                            <div className="check">
                                                <input 
                                                className="" 
                                                type="checkbox" 
                                                name="checked" 
                                                onChange={this.handleChange} 
                                                value={this.state.checked} 
                                                /> Ir directamente al perfil del usuario
                                            </div><br/>
                                            <div>
                                                <input 
                                                type="text" 
                                                id="search" 
                                                name="Data" 
                                                className="btn btn-outline-primary" 
                                                placeholder={this.state.checked ? 'Ir directamente al Perfil':'Nombre de Usuario'} 
                                                value={this.state.Data}  
                                                onChange={ (e) => {this.setState({ [e.target.name]: e.target.value});
                                                }}
                                                />
                                                <span>
                                                    <button 
                                                    onClick={this.Search}
                                                    className="btn btn-outline-primary">Buscar</button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </center>
                </section>
            </React.Fragment>
        );
    }
}

export default Main;
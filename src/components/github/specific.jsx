import React, { Component } from 'react';
import Repos from './repos';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {AddToFavorite, DelFromFavorite, GETFavoriteState} from '../../store/actions';

class Specific extends Component {
    constructor(props) {
        super(props);
        this.state = { user: [],
            is_Favorite: false };
        
        this.props.GETFavoriteState();

        const FetchUser = async(user) => {
            const apiCall = await fetch(`https://api.github.com/users/${user}`);
            const data = await apiCall.json();
            return {data} 
        };
        //Inicializando el método.
        FetchUser(props.match.params.login).then((res) => {
            if(!res.data.message) {
                this.setState({ user: res.data});
            }
        })
    }
    
    async componentDidMount(){
        console.log('specific', this.props.Favorite.FavoriteData);
        let data = this.props.Favorite.FavoriteData;
        let theUser = this.props.match.params.login;

        for(let index = 0; index < data.length; index++) {
            const element = data[index];
            if(element === theUser) {
                this.setState({is_Favorite: true})
            }
        }
    }

    AddToFav = () => {
        this.props.AddToFavorite(this.state.user.login);
        this.setState({is_Favorite: true})
    }

    RemoveFromFav = () => {
        this.props.DelFromFavorite(this.state.user.login);
        this.setState({is_Favorite: false});
    }

    Data(){
        if(this.state.user.length === 0) {
            return (<i>No se encontró a nadie con este nombre de usuario.</i>)
        }
        else {
            return (
                <center>
                <section className="Specific">
                    <div className="main" id="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 col-md-12">
                                    <div className="SUsersData">
                                            {this.state.is_Favorite === false ? 
                                            <i onClick={this.AddToFav} className="fas fa-heart  NotFave"></i> :
                                            <i onClick={this.RemoveFromFav} className="fas fa-heart  Fave"></i>}
                                        <h4>Nombre : <i className="bl">{this.state.user.name}</i></h4>
                                        <img src={this.state.user.avatar_url} alt="" />
                                        <h4>Seguidores : <i className="bl">{this.state.user.followers }</i>  </h4> 
                                        <h4>Ubicación : <i className="bl">{this.state.user.location}</i> </h4>
                                        <Repos user={this.props.match.params.login} />          
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                </center>
            )
        }
    }
    render() {
        return(
            <React.Fragment>

                {this.Data()};

            </React.Fragment>

        );
    }
}

Specific.propTypes = {
    AddToFavorite: PropTypes.func.isRequired,
    DelFromFavorite: PropTypes.func.isRequired,
    GETFavoriteState : PropTypes.func.isRequired,
    Favorite : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Favorite: state.Favorite
});

export default connect(mapStateToProps, {AddToFavorite, DelFromFavorite, GETFavoriteState}) (Specific);
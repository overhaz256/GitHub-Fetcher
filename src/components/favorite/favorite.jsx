import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {AddToFavorite, DelFromFavorite, GETFavoriteState} from '../../store/actions';

class Favorite extends Component {
    constructor(props){
        super(props);
        this.state = { users: [] };
        this.props.GETFavoriteState();
        console.log('Store 2', props);
        this.Data();
    }

    async Data(){
        console.log('Store2', this.props);
        let data = await this.props.Favorite.FavoriteData
        let BigDATA = [];
        for( let index = 0; index < data.length; index++) {
            const user = data[index];
            const fetchUsers = async (user) => {
                const apiCall = await fetch(`https://api.github.com/users/${user}`);
                const data = await apiCall.json();
                return {data}
            };
            fetchUsers(user).then((res) => {
                if(!res.data.message) {
                    res.data.is_user_in_Favorite = true;
                    BigDATA.push(res.data);
                    this.setState({ users: BigDATA})
                }
            })
        }
    }

    RemoveFromFav(user) {
        this.props.DelFromFavorite(user);
        let array = this.state.users;
        let newArray = [];
        for(let index=0; index < array.length; index++) {
            const el = array[index];
            if(el.login === user) {
                el.is_user_in_Favorite = false;
            }
            newArray.push(el);
        }
        this.setState({ users: newArray });
    }

    ReAddToFav(user) {
        this.props.AddToFavorite(user);
        let array = this.state.users;
        let newArray = [];
        for(let index=0; index < array.length; index++) {
            const el = array[index];
            if(el.login === user) {
                el.is_user_in_Favorite = true;
            }
            newArray.push(el);
        }
        this.setState({ users: newArray })
    }
    
    GoFetchOnNewUser(data) {
        this.props.history.push({
            pathname: `/Specific/${data}`,
        });
    }


    render() {
        return (
            <React.Fragment>
            <main role="main">
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">

                            {this.state.users.map( user => (
                                <div key={user.id} className="col-md-4">
                                    <div key={user.id} className="card mb-4 shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" width="100%" height="225" src={user.avatar_url} alt=''  />
                                        <div className="card-body">
                                            <p className="card-text text-center">
                                                Nombre : { user.login }
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="button" onClick={() => { this.GoFetchOnNewUser(user.login)}} key={user.id} className="btn btn-sm btn-outline-secondary">Ver Perfil</button>
                                                    </div>
                                                    {user.is_user_in_Favorite ?  
                                                    <button type="button" 
                                                    onClick={()=> {this.RemoveFromFav(user.login)}} 
                                                    className="btn btn-sm ">
                                                        <i className="fas fa-heart Fave"></i>
                                                    </button>: 
                                                    <button type="button" 
                                                    onClick={()=> {this.ReAddToFav(user.login)}}
                                                    type="button"
                                                    className="btn btn-sm ">
                                                        <i className="fas fa-heart NotFave"></i>
                                                    </button> 
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            </React.Fragment>
        );
    }
}

Favorite.propTypes = {
    AddToFavorite: PropTypes.func.isRequired,
    DelFromFavorite: PropTypes.func.isRequired,
    GETFavoriteState: PropTypes.func.isRequired,
    Favorite: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Favorite: state.Favorite
});

export default connect (mapStateToProps, {AddToFavorite, DelFromFavorite, GETFavoriteState})(Favorite);
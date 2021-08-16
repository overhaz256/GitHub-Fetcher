import React, {Component} from 'react';
import './App.css';
import Nav from './components/nav/nav';
import Main from './components/github/main';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Data from './components/github/data';
import Specific from './components/github/specific';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers';
import Favorite from './components/favorite/favorite';
import LoginRegister from './components/login-register/logreg'
import { ReUserState } from './store/actions';
import PrivateRoute from './private-route';
import Profile from './components/profile/profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthentication : false
     };

    //Crear Store
    this.store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && 
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  //Check if user is auth
  async componentDidMount(){
    if(localStorage.getItem('token')){
      this.store.dispatch(ReUserState(true));
      this.setState({isAuthentication:true})
    }
    else {
      this.store.dispatch(ReUserState(false));
      this.setState({isAuthentication:false})
    }
    await this.store.subscribe(() => {
      this.setState( { isAuthentication: this.store.getState()['Users']['isAuthenticated'] } )
    })
  }

  Logout = () => {
    console.log('logout')
    localStorage.removeItem("token");
    this.store.dispatch(ReUserState(false));
    this.setState({ auth: false })
  }

  render() {
    return (
      <React.Fragment>
        <Provider store = {this.store}>
        <Router>
          <Nav Logout= {this.Logout} store = {this.store}/>
          <Route exact path='/' component={Main}/>
          <Route exact path='/Data/:id' component={Data}/>
          <Route exact path='/Specific/:login' component={Specific}/>
          <Route exact path='/Favorite' component={Favorite}/>
          <Route exact path='/LoginRegister' component= {LoginRegister} />
          <PrivateRoute exact path='/Profile' Logout={this.Logout} Auth={this.state.isAuthentication} component={Profile} />
        </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
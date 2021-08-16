import React, {Component } from 'react';

class Data extends Component {
    constructor(props) {
        super(props);
        this.state = { user: [] };
        console.log('username', props.match.params.id);
        const FetchUsers = async(user) => {
            const API_Call = await fetch(`https://api.github.com/search/users?q=${user}`);
            const data = await API_Call.json();
            return {data}
        };
        //Inicializar el método
        FetchUsers(props.match.params.id).then((res) => {
            this.setState({ user:res.data.items });
            console.log('Los datos', res.data.items);
        })
    }

        GoFetchOneUser(data){
            this.props.history.push({
                pathname: `/Specific/${data}`
            });
        }
    render(){
        return(
            <React.Fragment>
            <main role="main">
            <div className="album py-5 bg-light">
            <div className="container">
                <div className="row"> 

                { this.state.user.map( user => (
                    <div className="col-md-3 cp" key={user.id} onClick={() => {this.GoFetchOneUser(user.login)}}>
                        <div className="card mb-4 shadow-sm">
                        <img className="bd-placeholder-img card-img-top" 
                        width="100%" height="225" 
                        src={user.avatar_url} 
                        alt=''/>   
                        <div className="card-body">
                        <p className="card-text text-center">
                            Nombre : {user.login}
                        </p>   
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

export default Data;
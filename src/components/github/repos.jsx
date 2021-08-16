import React, { Component } from 'react';

class Repos extends Component {
    constructor(props) {
        super(props);
        this.state = { repos: [] };

        const FetchRepose = async(user) => {
            const apiCall = await fetch(`https://api.github.com/users/${user}/repos`);
            const data = await apiCall.json();
            return { data }
        };

        FetchRepose(props.user).then((res)=>{
            if(res.data.length > 0 & !res.data.message){
                let items = [];
                for(let i = 0; i < 5; i++){
                    items.push(res.data[i]);
                    console.log(items);
                    if(i === 4){
                        this.setState({ repos: items })
                    }
                }
            }
        })
    }
    render() {
        return (
           <React.Fragment>
                    <div>
                        <h3>Últimos 5 repositorios:</h3>
                        <div className="lastfiveRepo">
                            {this.state.repos.map(res => (
                                <div key={res.id}>
                                    <a key={res.id} href={res.html_url}>
                                        {res.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
           </React.Fragment> 
        );
    }
}

export default Repos;
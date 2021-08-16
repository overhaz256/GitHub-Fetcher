import React, { Component } from 'react';
import axios from 'axios';
import { confirm as confirmComplex} from './confirm';

const PORT = process.env.PORT || 4000;
const URL_Backend = `http://localhost:${PORT}/api/users`;

class Profile extends Component{
    mounted = false;
    constructor(props){
        super(props);
        this.state = { 
            id: '',
            name: '',
            address: '',
            email: '',
            pic: '',
            IsEdit: false,
            file: '',
            password: '',
            errors: ''
        }
    }

componentWillUnmount(){ this.mounted = false; }

componentWillMount(){
    this.mounted = true;
    const token = localStorage.getItem('token');
    if(token){
        axios.get(`${URL_Backend}/GetUserData`, {
            headers: {
                Authorization: token
            }
        }).then((res) => {
            console.log('res', res);
            console.log('res', res.data.result[0]);
            if(this.mounted){
                const data = res.data.result[0];
                this.setState({
                    id: data.id,
                    name: data.name,
                    address: data.adress,
                    email: data.email,
                    pic: data.pic
                })
            }
        })
    }
}

pic = () => {
    if(this.state.pic === 'No definido' || 
    this.state.pic === undefined ||
    this.state.pic === null || 
    this.state.pic === ''){
        return false
    }
    else {
        return true
    }
}

EditUserData = () => {
    console.log('Editar');
    this.setState({
        IsEdit: true
    })
}

//Editar INICIO

    onChange = (e) => { 
        this.setState({[e.target.name]: e.target.value});
    }
    
    __handleimageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file:file,
                pic:reader.result
            });
        }
        reader.readAsDataURL(file)
    }

    SaveUserData = (e) => {
        this.setState({[e.target.name]: e.target.value});
        this.setState({
            IsEdit: false
        });

        const file = this.state.file;
        const postData = new FormData();

        postData.append("name", this.state.name);
        postData.append("address", this.state.address);
        postData.append("pic", this.state.pic);
        postData.append("image", file);

        //HTTP Request
        axios.put(`${URL_Backend}/edit/${this.state.id}`, postData)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }
//Editar FIN

//Eliminar usuario

handleOnClickRemove = () => {
    confirmComplex({password: ' Ingresa tu contraseña por favor.'}).then(({input})=>{
        this.setState({password: input});
        this.RequestToRemove();
    }, () => {this.setState({password:'canceled'}) });
}

RequestToRemove = () => {
    const pass = this.state.password;
    //Http Request
    axios.delete(`${URL_Backend}/delete/${this.state.id}/${pass}`)
    .then(res =>{
        console.log(res.data.message);
        this.props.Logout();
    })
    .catch(this.setState({errors: 'La contraseña es incorrecta'}))
}
//Termino de eliminar usuario

        render(){
            return(
            <React.Fragment>
            <center>
                { this.state.errors ?
                    <i className="alert alert-danger" role="alert">
                    {this.state.errors}</i> : '' 
                } 
                <section className="Specific">
                <div className="main" id="main">
                    <div className="container">
                    <div className="row">
                    <div className="col-lg-12 col-md-12">

                    { this.state.IsEdit ? 
                        //Editar datos
                        <div className="SUsersData">
                        <h4><i className="bl">Tus Datos de Perfil</i></h4>
                        {this.pic() ?
                            <img src={this.state.pic} alt=''/> : 
                            <img src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt="" />
                        }  
                        <div className='clear'></div>
                        <div>
                            <label htmlFor="file-upload" className='custom-file-upload'>Cargar</label>
                            <input id='file-upload' type='file'
                            onChange={this.__handleimageChange} />    
                        </div>                       
                        <input type='text' name='name' placeholder='name'
                        className='form-control m-2'
                        value={this.state.name ? this.state.name :''}
                        onChange={this.onChange} />

                        <input type='text' name='email' placeholder='email'
                        className='form-control m-2'
                        value={this.state.email}
                        onChange={this.onChange} 
                        disabled
                        />

                        <input type='text' name='address' placeholder='address'
                        className='form-control m-2'
                        value={this.state.address ? this.state.address :''}
                        onChange={this.onChange} />
                        
                        <button onClick={this.SaveUserData} class="edit btn btn-primary">
                        <i class="fas fa-edit"></i>Guardar Cambios</button>
                        </div>
                    :
                    <div className="SUsersData">
                    <button onClick={this.EditUserData} className="edit btn btn-danger">
                    <i className="fas fa-edit"></i> Editar</button>
                    <h4><i className="bl">Tus Datos Personales</i></h4>
                    {this.pic() ?
                    <img src={this.state.pic} alt=' '/>: 
                    <img src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt="" />
                    }
                    <h4>Nombre  :<i className="bl"> 
                    {this.state.name ? this.state.name: ''} </i> </h4> 
                    <h4>E-mail  :<i className="bl">
                    {this.state.email}</i></h4>
                    <h4>Dirección  :<i className="bl">
                    {this.state.address ? this.state.address : ''} </i></h4>
                    </div>
                    }
                    <div className='REMOVEU'>
                        <butt className='btn btn-danger m-2'
                        onClick={this.handleOnClickRemove}>Eliminar Cuenta</butt>
                    </div>
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
export default Profile;
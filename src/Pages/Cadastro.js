import React, { Component } from 'react';
import axios from 'axios';
import string from '../Strings';

export default class Cadastro extends Component {   
    state = {
        id: 0,
        name: '',
        avatar: '',
        option: 'Atores',
        offline: false,
    };

    componentDidMount = () => {
        window.addEventListener('online', () => {
            this.setState({offline: false});
            for(let i = 1; i <= localStorage.length; i++){
                let values = JSON.parse(localStorage.getItem(i))
                console.log(values);
                axios.post(values.url, {
                    id: values.id,
                    createdAt: values.createdAt,
                    name: values.name,
                    avatar: values.avatar
                    })
                    .then((response) => {
                        localStorage.removeItem(localStorage.key(i-1))
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            }
        });
    
        window.addEventListener('offline', () => {
            this.setState({offline: true});
        });
    }

    componentDidUpdate() {
        let offlineStatus = !navigator.onLine;
        if(this.state.offline !== offlineStatus){
          this.setState({offline: offlineStatus});
        }
    }

    cadastrar = () => {
        let date = new Date();
        let URL;
        console.log(this.state.option);
        if(this.state.option === 'Atores'){
            URL = `${string.API_KEY}atores`;
            if(!this.state.offline){
                axios.post(URL, {
                    id: this.state.id,
                    createdAt: date,
                    name: this.state.name,
                    avatar: this.state.avatar
                  })
                  .then((response) => {
                    console.log(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
            }else{
                let body = {
                    url: URL,
                    id: this.state.id,
                    createdAt: date,
                    name: this.state.name,
                    avatar: this.state.avatar
                }
                localStorage.setItem((localStorage.length + 1), JSON.stringify(body));
            }
        }else{
            URL = `${string.API_KEY}filmes`
        }
    }

    render(){
        let status = this.state.offline ? 'offline' : 'online'
        return(
            <div>
                <p>{status}</p>
                <input
                    type="text"
                    onChange={e => this.setState({id: e.target.value})}
                    placeholder="id"
                    value={this.state.id}
                />
                <input
                    type="text"
                    onChange={e => this.setState({name: e.target.value})}
                    placeholder="nome"
                    value={this.state.name}
                />
                <input
                    type="text"
                    onChange={e => this.setState({avatar: e.target.value})}
                    placeholder="avatar"
                    value={this.state.avatar}
                />
                <select value={this.state.option} onChange={e => this.setState({option: e.target.value})}>
                    <option value="Atores">Atores</option>
                    <option value="Filmes">Filmes</option>
                </select>
                <button onClick={() => this.cadastrar()}>Cadastrar</button>
            </div>
        );
    }
}
import React, { Component } from 'react';
import axios from 'axios';
import string from '../Strings';

export default class Cadastro extends Component {   
    state = {
        id: 0,
        name: '',
        avatar: '',
        option: ''
    };

    cadastrar = () => {
        let date = new Date();
        let URL;
        if(this.state.option === 'Atores'){
            URL = `${string.API_KEY}atores`;
        }else{
            URL = `${string.API_KEY}filmes`
        }
        axios.post(URL, {
            id: this.state.id,
            createdAt: date,
            name: this.state.name,
            avatar: this.state.avatar
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render(){
        return(
            <div>
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
                    <option value="Aluno">Aluno</option>
                    <option value="Professor">Professor</option>
                </select>
                <button onClick={() => this.cadastrar()}>Cadastrar</button>
            </div>
        );
    }
}
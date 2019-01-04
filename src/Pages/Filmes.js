import React, { Component } from 'react';
import axios from 'axios';
import string from '../Strings';

export default class Filmes extends Component {
    constructor(){
        super();
        this.state = {
            filmes: []
        }
    }
    componentDidMount() {
        axios.get(`${string.API_KEY}filmes`)
            .then(response => {
                response.data.forEach((value) => {
                    this.setState({
                        filmes: this.state.filmes.concat(value),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    renderFilmes = () => {
        return this.state.filmes.map((value) => {
            return <li className="box" key={value.id}>
                <img src={value.avatar} alt={value.name}/><br />
                {value.name}
            </li>
        })
    }

    render(){
        return(
            <ul className="container">
                {this.renderFilmes()}
            </ul>
        );
    }
}
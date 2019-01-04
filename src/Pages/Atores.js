import React, { Component } from 'react';
import string from '../Strings';
import axios from 'axios';
import '../styles/index.css';

export default class Atores extends Component {
    constructor(){
        super();
        this.state = {
            atores: []
        }
        this.renderAtores = this.renderAtores.bind(this);
    }

    componentDidMount = () => {
        axios.get(`${string.API_KEY}atores`)
            .then(response => {
                response.data.forEach((value) => {
                    this.setState({
                        atores: this.state.atores.concat(value),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    renderAtores = () => {
        return this.state.atores.map((value) => {
            return <li className="box" key={value.id}>
                <img src={value.avatar} alt={value.name}/><br />
                {value.name}
            </li>
        })
    }

    render(){
        return(
            <ul className="container">
                {this.renderAtores()}
            </ul>
        );
    }
}
import React, { Component } from 'react';
import string from '../Strings';
import axios from 'axios';
import '../styles/index.css';

export default class Postagens extends Component {
    constructor(){
        super();
        this.state = {
            postagens: []
        }
        this.renderPostagens = this.renderPostagens.bind(this);
    }

    componentDidMount = () => {
        axios.get(`${string.API_KEY}postagens`)
            .then(response => {
                response.data.forEach((value) => {
                    this.setState({
                        postagens: this.state.postagens.concat(value),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    renderPostagens = () => {
        return this.state.postagens.map((value) => {
            return <li className="box" key={value.id}>
                <img src={value.images} alt={value.description}/><br />
                {value.description}
            </li>
        })
    }

    render(){
        return(
            <ul className="container">
                {this.renderPostagens()}
            </ul>
        );
    }
}
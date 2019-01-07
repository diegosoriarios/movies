import React, { Component } from 'react';
import axios from 'axios';
import string from '../Strings';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'picload';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/diegosoriarios/upload';
const URL = `${string.API_KEY}postagens`;

export default class Cadastro extends Component {   
    state = {
        description: '',
        offline: false,
        uploadedFileCloudinaryUrl: '',
        uploadedFile: null,
        url: ''
    };

    componentDidMount = () => {
        window.addEventListener('online', () => {
            this.setState({offline: false});
            if(localStorage.length !== 0){
                for(let i = 1; i <= localStorage.length; i++){
                    let values = JSON.parse(localStorage.getItem(i))
                    axios.post(values.url, {
                        createdAt: values.createdAt,
                        description: values.description,
                        images: values.url
                        })
                        .then((response) => {
                            console.log(response)
                            localStorage.removeItem(localStorage.key(i-1))
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
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
        console.log(this.state.uploadedFile)
        let date = new Date();
        if(!this.state.offline){
            axios.post(URL, {
                createdAt: date,
                description: this.state.description,
                images: this.state.url
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
                createdAt: date,
                description: this.state.description,
                images: this.state.url
            }
            localStorage.setItem((localStorage.length + 1), JSON.stringify(body));
        }
    }

    onImageDrop = files => {
        this.setState({
            uploadedFile: files[0]
        });
        this.handleImageUpload(files[0]);
    }

    handleImageUpload = file => {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
        upload.end((err, response) => {
            if(err){
                console.log(err);
            }

            if(response.body.secure_url !== ''){
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url,
                    url: response.body.url
                });
            }
        });
    }

    renderZone = () => {
        return (<div className="dropzone">
            <div className="FileUpload">
                <Dropzone
                    onDrop={this.onImageDrop.bind(this)}
                    accept="image/*"
                    multiple={false}>
                        {({getRootProps, getInputProps}) => {
                        return (
                            <div
                            {...getRootProps()}
                            >
                            <input {...getInputProps()} />
                            {
                            <p>Solte seus arquivos, ou clique para enviar.</p>
                            }
                            </div>
                        )
                    }}
                </Dropzone>
            </div>
            <div>
                {this.state.uploadedFileCloudinaryUrl === '' ? null:
                    <div>
                        <p>{this.state.uploadedFile.name}</p>
                        <img src={this.state.uploadedFileCloudinaryUrl} alt={this.state.uploadedFile.name}/>
                    </div>
                }
            </div>
        </div>);
    }

    render(){
        let status = this.state.offline ? 'offline' : 'online'
        return(
            <div>
                <p>{status}</p>
                {this.renderZone()}
                <textarea
                    type="text"
                    placeholder="Digite a descrição"
                    className="textArea"
                    onChange={e => this.setState({description: e.target.value})}
                    value={this.state.description}
                /><br />
                <button onClick={() => this.cadastrar()}>Postar</button>
            </div>
        );
    }
}
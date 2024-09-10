import express from 'express';
import cors from 'cors';
import routes from './routes';
 
//importando database
import './database';

class App{
    
    //construtor inicia
    constructor(){
        this.server = express(); 
        this.middlewares();
        this.routes();
    }

    //meio do caminho informando que usa JSON
    middlewares(){
        this.server.use(cors());
        this.server.use(express.json());
    }

    //instancia as rotas naquela porta do server
    routes(){
        this.server.use(routes);
    }

}

export default new App().server;
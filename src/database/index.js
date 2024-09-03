import Sequelize, { Model }  from "sequelize";
import databaseCOnfig from '../config/database'

import User from "../app/models/User";

const models = [User];

class Database {

    //inicializa o Init
    constructor(){
        this.init();
    }

    //conexão do banco de dados com os modulos
    init() {
        this.connection = new Sequelize(databaseCOnfig);

        //percorro o model atual e levo ela para a conex BD
        models.map(model => model.init(this.connection));
    }
}


export default new Database();
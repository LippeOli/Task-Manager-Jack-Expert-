import Sequelize, { Model } from "sequelize";


class User extends Model {

    //criamos os objetos de uma classe User 

    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password_hash: Sequelize.STRING,   
            },
            {
                sequelize,      //juntamos e enviamos tudo
            }
        );
    }
}

export default User;

import Sequelize, { Model } from "sequelize";
import bcrypt from 'bcryptjs';

class User extends Model {

    //criamos os objetos de uma classe User 

    static init(sequelize){
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,   
            },
            {
                sequelize,      //juntamos e enviamos tudo
            }
        );

        //Criptografica da senha com Hash 
        this.addHook('beforeSave', async(user)=> {
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);   
            }
        });

        return this;
    }

    checkPassword(password){
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;

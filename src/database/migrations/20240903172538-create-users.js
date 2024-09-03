'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('users', { 
      id: {
        type: Sequelize.INTEGER,  //ser inteiro
        allowNull: false,         //não ser vazio
        autoIncrement: true,      //ir tendo contagem
        primaryKey: true,         //ter chave primario
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,             //email ser único
      },
      password_hash: {            //não salva a senha e sim uma tab hash criptografio"
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {                //data criada
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {                 //data atualizada
        type: Sequelize.DATE,
        allowNull: false,
      },

    });  
  },

  async down (queryInterface) {
    
    await queryInterface.dropTable('users');
  
  }
};

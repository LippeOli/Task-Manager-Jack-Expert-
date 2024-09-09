'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('tasks', { 
      id: {
        type: Sequelize.INTEGER,  //ser inteiro
        allowNull: false,         //não ser vazio
        autoIncrement: true,      //ir tendo contagem
        primaryKey: true,         //ter chave primario
      },
      task: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      check: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,      //comeca como nao concluida
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,  
        references: {model: 'users', key: 'id' },
        onUpdata: 'CASCADE',
        onDelete: 'SET NULL',
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
    
    await queryInterface.dropTable('tasks');
  
  }
};

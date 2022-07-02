'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('auth_userpass', {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      employeeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      passwordSalt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      loginAttempts: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('auth_userpass');
  }
};

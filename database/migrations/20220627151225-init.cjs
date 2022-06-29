'use strict';
const sequelize = require('sequelize');
const timestamps = {
    createdAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: sequelize.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
}

module.exports = {
  async up (queryInterface, Sequelize) {
    Promise.all([
        queryInterface.createTable('employees', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            givenName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            familyName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            homeAddress: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mailingAddress: {
                type: Sequelize.STRING,
                allowNull: true
            },
            ...timestamps
        }),
        queryInterface.createTable('asset_items', {
            assetId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            assetTag: {
                allowNull: true,
                type: Sequelize.STRING
            },
            assetType: {
                allowNull: false,
                type: Sequelize.STRING
            },
            manufacturer: {
                allowNull: false,
                type: Sequelize.STRING
            },
            modelNumber: {
                allowNull: false,
                type: Sequelize.STRING
            },
            serialNumber: {
                allowNull: false,
                type: Sequelize.STRING
            },
            acquisitionDate: {
                allowNull: false,
                type: Sequelize.DATE
            },
            enteredBy: {
                allowNull: false,
                type: Sequelize.UUID
            },
            retirementDate: {
                allowNull: true,
                type: Sequelize.DATE
            },
            retiredBy: {
                allowNull: true,
                type: Sequelize.UUID
            },
            ...timestamps
        }),
        queryInterface.createTable('asset_assignments', {
            assignmentId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            assetUUID: {
                allowNull: false,
                type: Sequelize.UUID
            },
            assignedToEmployeeUUID: {
                allowNull: false,
                type: Sequelize.UUID
            },
            assignedOn: {
                allowNull: false,
                type: Sequelize.DATE
            },
            assignedCondition: {
                allowNull: true,
                type: Sequelize.STRING
            },
            returnedOn: {
                allowNull: true,
                type: Sequelize.DATE
            },
            returnCondition: {
                allowNull: true,
                type: Sequelize.STRING
            },
            assignedEntryBy: {
                allowNull: false,
                type: Sequelize.UUID
            },
            returnEntryBy:{
            allowNull: true,
            type: Sequelize.UUID
            },
            ...timestamps 
        }),
    ]);
  },

  async down (queryInterface, Sequelize) {
    Promise.all([
        queryInterface.dropTable('employees'),
        queryInterface.dropTable('asset_items'),
        queryInterface.dropTable('asset_assignments'),
    ]);
  }
};

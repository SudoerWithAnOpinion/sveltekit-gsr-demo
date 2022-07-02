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
        return queryInterface.createTable('asset_maintenances', {
            maintenanceId: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false
            },
            assetId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'asset_items',
                    key: 'assetId'
                }
            },
            checkInAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            checkedInBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'employees',
                    key: 'id',
                }
            },
            checkedInReason: {
                type: Sequelize.STRING,
                allowNull: false
            },
            checkInComment: {
                type: Sequelize.STRING,
                allowNull: true
            },
            relatedTicketId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            maintenanceType: {
                type: Sequelize.STRING,
                allowNull: false
            },
            startedAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            finishedAt: {
                type: Sequelize.DATE,
                allowNull: true
            },
            repairNotes: {
                type: Sequelize.STRING,
                allowNull: true
            },
            performedBy: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'employees',
                    key: 'id',
                }
            },
            result: {
                type: Sequelize.STRING,
                allowNull: true
            },
            ...timestamps,
        });
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.dropTable('asset_maintenances');
    }
};

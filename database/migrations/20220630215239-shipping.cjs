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
    await queryInterface.createTable('asset_shipments', {
      shipmentId: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      shippedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      shippedBy: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'id',
        }
      },
      reason: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      via: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      trackingNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      arrivalAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      arrivalType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      arrivalAcknowledgedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'employees',
          key: 'id'
        }
      },
      ...timestamps
    });
    await queryInterface.createTable('asset_shipment_contents', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      shipmentId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'asset_shipments',
          key: 'shipmentId',
        }
      },
      assetId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'asset_items',
          key: 'assetId',
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('asset_shipment_contents');
    await queryInterface.dropTable('asset_shipments');
  }
};

'use strict';

const { faker } = require("@faker-js/faker");
const recordCount = 25;

faker.seed(1); // Must match the seed in the database/seeders/20220627170742-assets.js for UUID generation
const employeeIds = [];
for (let i = 0; i < recordCount; i++) {
  employeeIds.push(faker.datatype.uuid());
}
faker.seed(recordCount + 1);
const assetIds = [];
for (let i = 0; i < recordCount; i++) {
  assetIds.push(faker.datatype.uuid());
}

faker.seed((recordCount * 3) + 1);
const shipmentIds = [];
for (let i = 0; i < recordCount; i++) {
  shipmentIds.push(faker.datatype.uuid());
}
faker.seed((recordCount * 4) + 1);
const shipmentContentIds = [];
for (let i = 0; i < recordCount; i++) {
  shipmentContentIds.push(faker.datatype.uuid());
}

let shipments = [];
let shipmentContents = [];
for (let i = 0; i < recordCount; i++) {
  /** @type {import('../../src/models/Assets/Shipping/Shipment').ShipmentAttributes} */
  const handlingEmployeeId = employeeIds[faker.datatype.number(recordCount - 1)];
  const shipment = {
    shipmentId: shipmentIds[i],
    shippedAt: faker.date.recent(150),
    reason: 'ACQUISITION',
    via: 'PICKUP',
    trackingNumber: `HANDLER/${handlingEmployeeId}`,
    destination: 'COST_CENTER/usa.texas.san_antonio',
    shippedBy: employeeIds[faker.datatype.number(recordCount - 1)],
    createdAt: faker.date.recent(200),
    updatedAt: faker.date.recent(1),
  };

  if (faker.datatype.boolean()) { 
    shipment.via = 'FedEx';
    shipment.trackingNumber = faker.datatype.number({ min: 1000000000, max: 9999999999 });
    shipment.arrivalAt = faker.date.recent(3);
    shipment.arrivalType = 'DELIVERY_CONFIRMED';
    shipment.arrivalAcknowledgedBy = employeeIds[faker.datatype.number(recordCount - 1)];
  }

  shipments.push(shipment);
  /** @type {import('../../src/models/Assets/Shipping/ShipmentContents').ShipmentContentsAttributes} */
  const shipmentContent = {
    id: shipmentContentIds[i],
    shipmentId: shipmentIds[i],
    assetId: assetIds[i],
  };
  shipmentContents.push(shipmentContent);
}

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('asset_shipments', shipments).then(() => { 
      return queryInterface.bulkInsert('asset_shipment_contents', shipmentContents);
    });
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('asset_shipment_contents', { shipmentId: shipmentIds }).then(() => { 
      queryInterface.bulkDelete('asset_shipments', {shipmentId: shipmentIds});
    });
  }
};

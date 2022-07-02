'use strict';
const {faker} = require('@faker-js/faker');
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

const assets = []; 
for (let i = 0; i < recordCount; i++) { 
  /** @type {import('../../src/models/Assets/AssetItem').AssetItemAttributes} */
  const asset = {
    assetId: assetIds[i],
    assetTag: faker.datatype.string(5),
    assetType: faker.helpers.arrayElement(['LAPTOP_COMPUTER', 'DESKTOP_COMPUTER']),
    manufacturer: faker.company.companyName(),
    modelNumber: faker.datatype.string(5),
    serialNumber: faker.datatype.string(10),
    acquisitionDate: faker.date.past(),
    enteredBy: employeeIds[faker.datatype.number(recordCount-1)],
    createdAt: faker.date.recent(3),
    updatedAt: faker.date.recent(1),
  }
  assets.push(asset);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('asset_items', assets, {
      fields: ['assetId', 'assetTag', 'assetType', 'manufacturer', 'modelNumber', 'serialNumber', 'acquisitionDate', 'enteredBy', 'createdAt', 'updatedAt'],
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('asset_items', {
      assetId: assetIds,
    }, {});
  }
};

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

faker.seed((recordCount * 2) + 1)
const assignmentIds = [];
for (let i = 0; i < recordCount; i++) {
  assignmentIds.push(faker.datatype.uuid());
}
/** @type {import('../../src/models/Assets/AssetAssignment').AssetAssignmentAttributes[]} */
const asset_assignments = []; 
for (let i = 0; i < recordCount; i++) { 
  /** @type {import('../../src/models/Assets/AssetAssignment').AssetAssignmentAttributes} */
  const asset_assignment = {
    assignmentId: assignmentIds[i],
    assetUUID: assetIds[i],
    assignedToEmployeeUUID: employeeIds[i],
    assignedOn: faker.date.past(60),
    assignedCondition: 'NEW',
    returnedOn: faker.date.recent(10),
    returnCondition:faker.helpers.arrayElement(['NEW','USED_LIKE_NEW','USED_COSMETIC_DAMAGE','USED_WORN','NON_FUNCTIONAL']),
    assignedEntryBy: employeeIds[faker.datatype.number({ min: 0, max: recordCount - 1 })],
    returnEntryBy: employeeIds[faker.datatype.number({ min: 0, max: recordCount - 1 })],
    createdAt: faker.date.recent(60),
    updatedAt: faker.date.recent(1),
  }
  asset_assignments.push(asset_assignment);
}
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('asset_assignments', asset_assignments, {
      asset_assignments
    }, {
      fields: ['assignmentId', 'assetUUID', 'assignedToEmployeeUUID', 'assignedOn', 'assignedCondition', 'returnedOn', 'returnCondition', 'assignedEntryBy', 'returnEntryBy', 'createdAt', 'updatedAt'],
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('asset_assignments', {
      assetId: assetIds,
    })
  }
};

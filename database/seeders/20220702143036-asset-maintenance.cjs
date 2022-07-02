'use strict';
const { Op } = require('sequelize');
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

faker.seed(recordCount * 5 + 1); // *3 & *4 are in use by other seeders; make sure we don't overlap with the other seeders
/** @type {string[]} */
const maintenanceIds = [];
for (let i = 0; i < recordCount; i++) {
  maintenanceIds.push(faker.datatype.uuid());
}


const maintTypes = ['HARDWARE_REPAIR', 'PREVENTATIVE'];
const maintenances = [];
for (let i = 0; i < recordCount; i++) {
    /** @type {import('../../src/models/Assets/Maintenance/Maintenance').MaintenanceAttributes} */
    const maintenance = {
        maintenanceId: maintenanceIds[i],
        assetId: assetIds[i],
        checkInAt: faker.date.recent(200),
        checkedInBy: employeeIds[faker.datatype.number({ min: 0, max: recordCount - 1 })],
        checkedInReason: 'TECHNICIAN_REQUEST',
        checkInComment: faker.lorem.sentence(),
        relatedTicketId: `SERVICE_NOW/${faker.datatype.number({ min: 1000000000, max: 9999999999 })}`,
        maintenanceType: faker.helpers.arrayElement(maintTypes),
        createdAt: faker.date.recent(200),
        updatedAt: faker.date.recent(1),
    };
    switch (faker.datatype.number(2)) { 
        case 2: // (Will Finish Maint.)
            maintenance.finishedAt = faker.date.recent(170);
            maintenance.repairNotes = faker.lorem.sentence();
            maintenance.performedBy = employeeIds[faker.datatype.number({ min: 0, max: recordCount - 1 })];
            maintenance.result = 'COMPLETE';
            // fallthrough
        case 1: // (Will Start, Will Not Finish Maint.)
            maintenance.startedAt = faker.date.recent(180);
            // fallthrough
        default: // (Will Not Start Maint. (but is checked in))
            break;
    }
    maintenances.push(maintenance);
}



module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('asset_maintenances', maintenances);
    },

    async down (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('asset_maintenances', {
            maintenanceId: maintenanceIds
        });
    }
};

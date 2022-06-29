'use strict';
const {faker} = require('@faker-js/faker');
const recordCount = 25;

faker.seed(1); // Must match the seed in the database/seeders/20220627170742-assets.js for UUID generation
const employeeIds = [];
for (let i = 0; i < recordCount; i++) {
  employeeIds.push(faker.datatype.uuid());
}

const employees = []; 
for (let i = 0; i < recordCount; i++) { 
  /** @type {import('../../src/models/Employee/Employee').EmployeeAttributes} */
  const employee = {
    'id': employeeIds[i],
    'givenName': faker.name.firstName(),
    'familyName': faker.name.lastName(),
    'email': faker.internet.email(),
    'phone': faker.phone.number('###-###-####'),
    'homeAddress': `${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`,
    'mailingAddress': null,
    'createdAt': faker.date.recent(30),
    'updatedAt': faker.date.recent(faker.datatype.number(10)),
  }
  employees.push(employee);
}

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', employees, {
      fields: ['id', 'givenName', 'familyName', 'email', 'phone', 'homeAddress', 'mailingAddress'],
    });
},

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('employees', {
      id: employeeIds,
    }, {});
  }
};

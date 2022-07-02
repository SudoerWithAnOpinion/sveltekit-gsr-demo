'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('employees', [{
      id: '00000000-0000-0000-0000-000000000001',
      givenName: 'Superuser',
      familyName: 'Administrator',
      email: 'S.Admin@exmaple.com',
      phone: '+1 555-555-5555',
      homeAddress: '123 Main St, Anytown, USA',
      mailingAddress: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]).then(() => {
      return queryInterface.bulkInsert('auth_userpass',[{
        username: 'admin',
        employeeId: '00000000-0000-0000-0000-000000000001',
        passwordSalt: 'qqR/VKemc71xl9KCzMksmQ==',
        passwordHash: '206e1c120d7404bab58240cf0d8f44375b58eacb6096c4b05ed0d3ff22531d98204b8eed472a7e308df8ad450440f99855446a75e4b353f9e415242a75b72623',
        createdAt: new Date(),
        updatedAt: new Date(),
      }]);
    });
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('auth_userpass', { where: { username: 'admin' } }).then(() => { 
      queryInterface.bulkDelete('employees', { id: '00000000-0000-0000-0000-000000000001'});
    })
  }
};

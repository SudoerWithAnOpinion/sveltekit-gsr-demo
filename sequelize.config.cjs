/** @type {import('sequelize').Options} */
const development = { 
    dialect: 'sqlite',
    storage: './local_db.sqlite'
}
/** @type {import('sequelize').Options} */
const test = {
    dialect: 'sqlite',
    storage: ':memory:'
}
/** @type {import('sequelize').Options} */
const production = process.env.SEQUELIZE_PROD_CONFIG;

module.exports = {
    development,
    test,
    production,
}


import type { Options } from 'sequelize';
import { Sequelize } from 'sequelize';
// const dbConfig = await import('../../sequelize.config.cjs');
import * as dbConfigFile from '../../sequelize.config.json';

import Employee, * as EmployeeModel from './Employee/Employee';
import UserPass, * as UserPassModel from './Authentication/UserPass';
import AssetItem, * as AssetItemModel from './Assets/AssetItem';
import AssetAssignment, * as AssetAssignmentModel from './Assets/AssetAssignment';
import Shipment, * as ShipmentModel from './Assets/Shipping/Shipment';
import ShipmentContents, * as ShipmentContentsModel from './Assets/Shipping/ShipmentContents';
import Maintenance, * as MaintenanceModel from './Assets/Maintenance/Maintenance';

let dbConfig: Options;
if (process.env.NODE_ENV === 'production' && process.env.SEQUELIZE_PROD_CONFIG === undefined) {
    //Forces Dev DB if the production config is not set
    dbConfig = dbConfigFile['development'] as Options;
} else {
    switch (process.env.NODE_ENV) {
        case 'production':
            dbConfig = process.env.SEQUELIZE_PROD_CONFIG;
            break;
        case 'test':
            dbConfig = dbConfigFile['test'] as Options;
            break;
        case 'development':
        default:
            dbConfig = dbConfigFile['development'] as Options;
            dbConfig.logging = (process.env.SEQUELIZE_VERBOSE == 'true' ? console.log : false);
            break;
    }
}

// Get Sequelize Instance
const sequelize = new Sequelize({
    ...dbConfig,
});
// Setup Models
const Models = [
    EmployeeModel,
    UserPassModel,

    AssetItemModel,
    AssetAssignmentModel,
    ShipmentModel,
    ShipmentContentsModel,
    MaintenanceModel,
];

Models.forEach((model) => model.init(sequelize));
Models.forEach((model) => model.associate());

export default sequelize;
export {
    sequelize,
    sequelize as Sequelize,
    Employee,
    UserPass,
    AssetItem,
    AssetAssignment,
    Shipment,
    ShipmentContents,
    Maintenance,
};

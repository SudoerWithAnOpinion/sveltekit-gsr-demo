import type { Options } from 'sequelize';
import { Sequelize } from 'sequelize';
// const dbConfig = await import('../../sequelize.config.cjs');
import * as dbConfigFile from '../../sequelize.config.json';

import Employee, { associate as EmployeeAssociate } from './Employee/Employee';
import UserPass, { associate as UserPassAssociate } from './Authentication/UserPass';
import AssetItem, { associate as AssetItemAssociate } from './Assets/AssetItem';
import AssetAssignment, { associate as AssetAssignmentAssociate } from './Assets/AssetAssignment';
import Shipment, { associate as ShipmentAssociate } from './Assets/Shipping/Shipment';
import ShipmentContents, { associate as ShipmentContentsAssociate } from './Assets/Shipping/ShipmentContents';
import Maintenance, { associate as MaintenanceAssociate } from './Assets/Maintenance/Maintenance';

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
            break;
    }
}

// Get Sequelize Instance
const sequelize = new Sequelize({
    ...dbConfig,
});

const db = {
    sequelize,
    Sequelize,
    Employee: Employee(sequelize),
    UserPass: UserPass(sequelize),
    AssetItem: AssetItem(sequelize),
    AssetAssignment: AssetAssignment(sequelize),
    Shipment: Shipment(sequelize),
    ShipmentContents: ShipmentContents(sequelize),
    Maintenance: Maintenance(sequelize),
};

EmployeeAssociate(sequelize.models);
UserPassAssociate(sequelize.models);
AssetItemAssociate(sequelize.models);
AssetAssignmentAssociate(sequelize.models);
ShipmentAssociate(sequelize.models);
ShipmentContentsAssociate(sequelize.models);
MaintenanceAssociate(sequelize.models);

export default db;

import models from '$models';
import type { RequestHandler } from './__types';

export const get: RequestHandler = async (event) => {
    const employeeList = await models.Employee.findAll().then(employees => {
        return employees.map(employee => {
            return employee.toJSON();
        });
    });
    Date.prototype.toJSON = function () { return this.toISOString(); }
    return {
        statusCode: 200,
        body: {
            employees: employeeList
        }
    }
}
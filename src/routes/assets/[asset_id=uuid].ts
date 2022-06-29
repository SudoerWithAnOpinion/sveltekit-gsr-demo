import type { AssetAssignmentAttributes } from '$models/Assets/AssetAssignment';
import type { RequestHandler } from './__types/[asset_id=uuid]';
import { AssetItem, AssetAssignment } from '$models';

export const get: RequestHandler = async (event) => {
    const asset_id = event.params.asset_id;
    const result = await Promise.all([
        AssetItem.findByPk(asset_id, {
            include: ['enteredByEmployee', 'retiredByEmployee']
        }),
        AssetAssignment.findAll({
            where: { assetUUID: asset_id },
            include: ['AssignedToEmployee']
        }),
    ]).then(results => {
        const [l_asset, l_assignments] = results;
        const assignments_AssignedToEmployee = l_assignments.map(l_assignment => {
            if (l_assignment.AssignedToEmployee) {
                return l_assignment.AssignedToEmployee.fullName;
            } else {
                return null;
            }
        });
        return {
            asset: l_asset,
            assignments: l_assignments,
            assignments_AssignedToEmployee
        };
    });
    return {
        statusCode: 200,
        body: result
    }
}
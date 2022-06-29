import type { ParamMatcher } from "@sveltejs/kit";
import * as uuid from 'uuid';
export const match: ParamMatcher = (param) => {
    return uuid.validate(param);
}
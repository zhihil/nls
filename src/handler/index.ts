import { ParsedOptions } from "../parser/types";

export function handler(optMap: [ParsedOptions, string[]]) {
    console.log("from the handler");
    console.log(optMap[0]);
    console.log(optMap[1]);
}

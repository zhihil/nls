import { OptionConfig } from "./types";

export enum Option {
    ALL_SHORT = 'a',
    ALL_LONG  = 'all',
}

export const availableOptions: OptionConfig = {
    [Option.ALL_SHORT] : {
        type: 'short',
        hasArg: false,
        hasOptionalArg: false,
    },
    [Option.ALL_LONG] : {
        type: 'long',
        hasArg: false,
        hasOptionalArg: false
    }
};

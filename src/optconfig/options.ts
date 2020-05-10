import { OptionConfig } from "./types";

enum Option {
    ALL_SHORT = 'a',
    ALL_LONG  = 'all'
}

export const availableOptions: OptionConfig = {
    [Option.ALL_SHORT] : {
        hasArg: false,
        hasOptionalArg: false
    },
    [Option.ALL_LONG] : {
        hasArg: false,
        hasOptionalArg: false
    }
};

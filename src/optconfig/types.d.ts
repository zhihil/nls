export type OptionType = 'long' | 'short';

export interface OptionMeta {
    // Does this option require an argument following it?
    hasArg: boolean;

    // This value is junk data if hasArg === false
    hasOptionalArg: boolean; 

    // Is this option a short or long option?
    type: OptionType;
}

export interface OptionConfig {
    [key: string]: OptionMeta
}

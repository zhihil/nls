export interface OptionMeta {
    hasArg: boolean;

    // This value is junk data if hasArg === false
    hasOptionalArg: boolean; 
}

export interface OptionConfig {
    [key: string]: OptionMeta
}

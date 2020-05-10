import availableOptions from "../optconfig";
import { OptionType } from "../optconfig/types";

export function isShortOption(token: string): boolean {
    return /^-[a-zA-Z]+$/.test(token);
}

export function isLongOption(token: string): boolean {
    return /^--[a-zA-Z]+$/.test(token);
}

export function isNormalArgument(token: string): boolean {
    return !isLongOption(token) && !isShortOption(token);
}

export function extractLongOptionName(token: string) {
    return token.slice(2);
}

export function extractShortOptionName(token: string) {
    return token.slice(1);
}

export function validateOption(token: string, type: OptionType) {
    for (let option of Object.keys(availableOptions)) {
        if (option === token && type === availableOptions[option].type) {
            return true;
        }
    }
    return false;
}


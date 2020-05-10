export function isShortOption(token: string): boolean {
    return /^-[a-zA-Z]+$/.test(token);
}

export function isLongOption(token: string): boolean {
    return /^--[a-zA-Z]+$/.test(token);
}

export function isNormalArgument(token: string): boolean {
    return !isLongOption(token) && !isShortOption(token);
}


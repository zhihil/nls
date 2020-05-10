export enum ParserErrorType {
    MISSING_ARG,
    INVALID_OPTION,
    DUPLICATE_OPT,
}

export class ParserError {
    constructor(
        public type: ParserErrorType, 
        public option: string
    ) {}
}

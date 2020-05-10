export enum ParserErrorType {
    MISSING_ARG,
    INVALID_OPTION
}

export class ParserError {
    constructor(
        public type: ParserErrorType, 
        public option: string
    ) {}
}

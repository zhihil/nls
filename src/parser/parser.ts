import { isLongOption, isNormalArgument, isShortOption } from "./options";
import availableOptions from "../optconfig";
import { ParserError, ParserErrorType } from "./error";
import { ParsedOptions } from "./types";

function extractLongOptionName(token: string) {
    return token.slice(2);
}

function extractShortOptionName(token: string) {
    return token.slice(1);
}

function validateOption(token: string) {
    for (let option of Object.keys(availableOptions)) {
        if (option === token) return true;
    }
    return false;
}

function parser_main(args: string[]): [ParsedOptions, string[]] {
    // Construct a mapping to represent the parsed arguments.
    let parsedArgs: ParsedOptions = {};
    let normalArgs: string[] = [];

    // Start from the third cmdline arg
    let i = 2;

    // Parse command line options
    for (; i < args.length; ++i) {
        
        if (isLongOption(args[i])) {
            const option = extractLongOptionName(args[i]);

            // Check that the option is valid
            if (!validateOption(option)) {
                throw new ParserError(ParserErrorType.INVALID_OPTION, args[i]);
            }

            // Check if the option requires an argument 
            if (!availableOptions[option].hasArg) {
                parsedArgs[option] = null;
                ++i; break;
            }

            // Extract the required argument
            let optArg = args[i + 1] || null;

            if (optArg && !isNormalArgument(optArg)) optArg = null;

            if (!optArg && !availableOptions[option].hasOptionalArg) {
                throw new ParserError(ParserErrorType.MISSING_ARG, args[i]);
            }
            parsedArgs[option] = optArg;

            ++i; break;
        }
    }

    // Parse "normal" arguments


    return [parsedArgs, normalArgs];
}

export function parser(args: string[]): [ParsedOptions, string[]] {
    let parsedArgs;

    try {
        parsedArgs = parser_main(args);
    } catch (err) {
        const parserError = err as ParserError;
        if (parserError.type === ParserErrorType.MISSING_ARG) {
            process.stdout.write(`ls: missing argument for ${parserError.option}\n`);
        }

        if (parserError.type === ParserErrorType.INVALID_OPTION) {
            process.stdout.write(`ls: invalid argument ${parserError.option}\n`);
        }
    }

    return parsedArgs;
}


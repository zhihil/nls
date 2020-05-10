import { isLongOption, isNormalArgument, extractShortOptionName, validateOption, extractLongOptionName } from "./options";
import availableOptions from "../optconfig";
import { ParserError, ParserErrorType } from "./error";
import { ParsedOptions } from "./types";

function parseArgument(parsedArgs: ParsedOptions, option: string, optVal: string | null) {
    // Check if the option requires an argument 
    if (!availableOptions[option].hasArg) {
        parsedArgs[option] = null;
        return false;
    }

    // Extract the required argument
    if (!optVal && !availableOptions[option].hasOptionalArg) {
        return true;
    }
    parsedArgs[option] = optVal;

    return false;
}

function parserMain(args: string[]): [ParsedOptions, string[]] {
    // Construct a mapping to represent the parsed arguments.
    let parsedArgs: ParsedOptions = {};
    let normalArgs: string[] = null;

    // Start from the third cmdline arg
    let i = 2;

    // Parse command line options
    for (; i < args.length; ++i) {
        if (isNormalArgument(args[i])) {
            break;
        }

        let option = null;
        let optionVal = args[i + 1] && isNormalArgument(args[i + 1]) 
            ? args[i + 1] 
            : null;

        if (isLongOption(args[i])) {
            option = extractLongOptionName(args[i]);

            if (!validateOption(option, 'long')) {
                throw new ParserError(ParserErrorType.INVALID_OPTION, args[i]);
            }
        } else {
            option = extractShortOptionName(args[i]);

            if (!validateOption(option, 'short')) {
                throw new ParserError(ParserErrorType.INVALID_OPTION, args[i]);
            }
        }

        if (option in parsedArgs) {
            throw new ParserError(ParserErrorType.DUPLICATE_OPT, args[i]);
        }

        const err = parseArgument(parsedArgs, option, optionVal);
        if (err) {
            throw new ParserError(ParserErrorType.MISSING_ARG, args[i]);
        }
        if (isLongOption(args[i])) {
            i += parsedArgs[option] ? 2 : 1;
            break;
        } else {
            i += parsedArgs[option] ? 1 : 0;
        }
    }

    // We should maintain the invariant that at this point in execution 
    // `arg[i]` is the first argument that is not an option nor a option
    // argument.

    // Parse "normal" arguments
    normalArgs = args.slice(i);

    return [parsedArgs, normalArgs];
}

export function parser(args: string[]): [ParsedOptions, string[]] {
    let parsedArgs;

    try {
        parsedArgs = parserMain(args);
    } catch (err) {
        const parserError = err as ParserError;
        if (parserError.type === ParserErrorType.MISSING_ARG) {
            process.stdout.write(`ls: missing argument for ${parserError.option}\n`);
        }

        if (parserError.type === ParserErrorType.INVALID_OPTION) {
            process.stdout.write(`ls: invalid argument ${parserError.option}\n`);
        }

        if (parserError.type === ParserErrorType.DUPLICATE_OPT) {
            process.stdout.write(`ls: duplicate option ${parserError.option}\n`);
        }

        process.exit(1);
    }

    return parsedArgs;
}


import { ParsedOptions } from "../parser/types";
import { promises } from "fs"
import { Option } from "../optconfig";
import { outputFormatted } from "./output";

const { readdir } = promises;

async function outputDirs(options: ParsedOptions, normalArgs: string[]) {
    const dirPromises = normalArgs.map(dirName => readdir(dirName));
    const dirResults  = await Promise.all(dirPromises);

    dirResults.forEach((files, i) => {
        if (normalArgs.length > 1) {
            process.stdout.write(`${normalArgs[i]}:\n`);
        }

        // Will want to extract this into a Command object.
        if (options[Option.ALL_LONG] !== null && options[Option.ALL_SHORT] !== null) {
            files = files.filter(file => !file.startsWith("."));
        }

        outputFormatted(files);

        if (i != normalArgs.length - 1) {
            process.stdout.write("\n");
        }
    });
}

export function handler(optMap: [ParsedOptions, string[]]) {
    outputDirs(...optMap);
}

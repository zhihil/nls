import { ParsedOptions } from "../parser/types";
import { promises } from "fs"
import { Option } from "../optconfig";

const { readdir } = promises;

function outputFormatted(tokens: string[]) {
    for (let token of tokens) {
        console.log(token);
    }
}

async function outputDirs(options: ParsedOptions, normalArgs: string[]) {
    const dirPromises = normalArgs.map(dirName => readdir(dirName));
    const dirResults  = await Promise.all(dirPromises);

    console.log(options);

    dirResults.forEach((files, i) => {
        if (normalArgs.length > 1) {
            console.log(`${normalArgs[i]}:`);
        }

        // Will want to extract this into a Command object.
        if (options[Option.ALL_LONG] !== null && options[Option.ALL_SHORT] !== null) {
            files = files.filter(file => !file.startsWith("."));
        }

        outputFormatted(files);

        if (i != normalArgs.length - 1) {
            console.log("");
        }
    });
}

export function handler(optMap: [ParsedOptions, string[]]) {
    outputDirs(...optMap);
}

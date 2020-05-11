export function getMaxFilenameLength(files: string[]): number {
    return files.reduce((acc, cur) => {
        if (cur.length > acc) {
            return cur.length;
        }
        return acc;
    }, 0);
}

export function computeMaxCols(maxFilenameLen: number): number {
    return Math.max(
        Math.floor(process.stdout.columns / maxFilenameLen) - 1, 
        1
    );
}

export function computeOutputGrid(numFiles: number, maxFilenameLen: number): [number, number] {
    const maxCols = computeMaxCols(maxFilenameLen);
    const maxRows = Math.ceil(numFiles / maxCols);

    return [maxRows, maxCols];
}

export function outputFormatted(files: string[]): void {
    const maxFilenameLen = getMaxFilenameLength(files);
    const [ maxRows, maxCols ] = computeOutputGrid(files.length, maxFilenameLen);

    // Output each row
    for (let i = 0; i < maxRows; ++i) {
        let line = '';

        // Construct the row to print
        for (let j = 0; j < maxCols; ++j) {
            const filename = files[i + j * maxRows];

            line = line.concat(`${filename || ""}`);

            if (j != maxCols - 1) {
                const fileLength = filename ? filename.length : 0;
                line = line.concat(" ".repeat(maxFilenameLen - fileLength + 1));
            }
        }

        process.stdout.write(`${line}\n`);
    }
}
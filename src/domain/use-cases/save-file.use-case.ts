import path from 'path';
import fs from 'fs';


export interface Options {

    fileContent: string;
    fileDestination?: string;
    fileName?: string
}

export interface SaveFileUseCase {
    execute: (options: Options) => boolean;
}


export class SaveFile implements SaveFileUseCase {
    constructor() { }
    execute({
        fileContent,
        fileDestination = 'outputs',
        fileName = 'table' }: Options): boolean {
        try {

            fs.mkdirSync(fileDestination, { recursive: true })
            const outFile = path.join(fileDestination, `${fileName}.txt`);
            fs.writeFileSync(outFile, fileContent)
            return true
        } catch (error) {
            console.error(error)
            return false
        }

    }
}
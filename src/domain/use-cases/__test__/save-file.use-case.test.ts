import { SaveFile } from '../save-file.use-case';
import fs from 'fs';
import path from 'path';


describe('SaveFileUseCase', () => {
    const options = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }
    const filePath = 'custom-outputs/file-destination/custom-table-name.txt';

    beforeEach(() => {

        jest.clearAllMocks();

    });

    afterEach(() => {
        if (fs.existsSync('outputs')) fs.rmSync('outputs', { recursive: true });

        if (fs.existsSync('custom-outputs')) fs.rmSync('custom-outputs', { recursive: true })
    })

    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt'
        const options = {
            fileContent: 'test content'
        }

        const result = saveFile.execute(options)
        const checkFile = fs.existsSync(filePath)
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(result).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);
    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        expect(result).toBeTruthy();
        expect(checkFile).toBeTruthy();
        expect(fileContent).toBe(options.fileContent);

    });

    test('should return false if directroy could not be created', () => {

        const saveFlie = new SaveFile();
        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') }
        );

        const result = saveFlie.execute(options)
        expect(result).toBe(false)
        mkdirMock.mockRestore();
    })

    test('should return false if file could not be created', () => {
        const safeFile = new SaveFile();
        const mkFileMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This file is no Implementation for testing message') }
        )
        const result = safeFile.execute(options);
        const checkFile = fs.existsSync(filePath)

        expect(!!checkFile).toBe(false)
        mkFileMock.mockRestore();
    })

});
import { CreateTable } from '../../domain/use-cases/create-table.use-case';
import { SaveFile } from '../../domain/use-cases/save-file.use-case';
import { ServerApp } from '../server-app';

describe('server-app.ts', () => {
    const options = {
        base: 2,
        limit: 10,
        show: false,
        destination: 'test-destination',
        name: 'test-filename',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should create ServerApp', () => {

        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')
    });

    test('should run ServerApp with options', () => {
        // const logSpy = jest.spyOn(console, 'log')
        // const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        // const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        // ServerApp.run(options);

        // expect(logSpy).toHaveBeenCalledTimes(2);
        // expect(logSpy).toHaveBeenCalledWith('Server running...');
        // expect(logSpy).toHaveBeenLastCalledWith('File created!!');

        // expect(createTableSpy).toHaveBeenCalledTimes(1);
        // expect(createTableSpy).toHaveBeenCalledWith({
        //     base: options.base,
        //     limit: options.limit,
        // });

        // expect(saveFileSpy).toHaveBeenCalledTimes(1);
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileDestination: options.destination,
        //     fileName: options.name
        // });
    });

    test('should run with custom values mocked', () => {
        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 1 = 1');
        const safeFaileMock = jest.fn().mockReturnValue(true);

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = safeFaileMock;
        console.log = logMock;
        console.error = logErrorMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running...');
        expect(createMock).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit
        });
        expect(safeFaileMock).toHaveBeenCalledWith({
            fileContent: createMock.mock.results[0].value,
            fileDestination: options.destination,
            fileName: options.name,
        });
        expect(logMock).toHaveBeenCalledWith('File created!!')
        expect(logErrorMock).not.toHaveBeenCalledWith()
    });
});
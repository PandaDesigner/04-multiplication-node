import { CreateTable } from '../create-table.use-case';


describe('CreateTableUseCase', () => {

    test('should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2 });
        const row = table.split('\n');

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(row).toHaveLength(10);
        expect(table).toContain('2 X 1 = 2');
        expect(table).toContain('2 X 10 = 20');
    })

    test('should create table with custom values', () => {

        const options = {
            base: 3,
            limit: 20
        }

        const createTable = new CreateTable();
        const table = createTable.execute(options);
        const row = table.split('\n');

        expect(row).toHaveLength(options.limit);
        expect(table).toContain('3 X 1 = 3');
        expect(table).toContain('3 X 20 = 60');
    })

})

const runCommand = async (args: Array<string>) => {
    process.argv = [...process.argv, ...args]
    const { yarg } = await import('../yargs.plugins')
    return yarg
}

describe('Test yargs.plugin.ts', () => {
    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {
        const yarg = await runCommand(['-b', '5'])
        expect(yarg).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            destination: 'outputs'
        }))
    });

    test('should return configuration with custom values', async () => {
        const argv = await runCommand([
            '-b', '2',
            '-s', '-l',
            '5', '-n',
            'test-name',
            '-d', 'custom'])

        expect(argv).toEqual(expect.objectContaining({
            b: 2,
            s: true,
            l: 5,
            n: 'test-name',
            destination: 'custom',
        }))

    });
});
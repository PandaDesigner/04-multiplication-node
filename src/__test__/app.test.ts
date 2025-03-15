import { ServerApp } from '../presentation/server-app';


describe('App', () => {

    test('should call Server.run with values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '10', '-l', '8', '-s', '-n', 'test-name', '-d', 'test-path'];
        await import('../app')

        const [mockApp] = serverRunMock.mock.lastCall

        expect(serverRunMock).toHaveBeenCalledWith({
            base: mockApp.base,
            destination: mockApp.destination,
            limit: mockApp.limit,
            name: mockApp.name,
            show: mockApp.show,
        })

    });
})
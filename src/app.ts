import { TableApp } from './config/plugins/table-app';
import { yarg } from './config/plugins/yargs.plugins';
import { ServerApp, RunOptions } from './presentation/server-app';


(async () => {
    await main()
})()

async function main() {
    const { b: base, l: limit, s: show, n: name, d: destination } = yarg;
    ServerApp.run({ base, limit, show, name, destination } as RunOptions);
}


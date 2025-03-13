import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


export const yarg = yargs(hideBin(process.argv))
    .option('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        description: 'Multiplicacion table base'
    })
    .option('l', {
        alias: 'limit',
        type: 'number',
        default: 10,
        description: 'Multiplication table limit'
    })
    .option('s', {
        alias: 'show',
        type: 'boolean',
        default: false,
        description: 'Show Multiplication table'
    })
    .option('n', {
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        description: 'File name'
    })
    .option('d', {
        alias: 'destination',
        type: 'string',
        default: 'outputs',
        description: 'File destination'
    })
    .check((argv, options) => {
        if (argv.b < 1) throw 'Error: base must be greater than 0'
        return true
    })
    .parseSync()



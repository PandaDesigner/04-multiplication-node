
export interface CreateTableUseCase {
    execute: (options: CreateTableOptions) => string
}

export interface CreateTableOptions {
    base: number;
    limit?: number;
}



export class CreateTable implements CreateTableUseCase {
    constructor(
        /**
         * DI - Dependecy Injection
         */
    ) { }

    execute({ base, limit = 10 }: CreateTableOptions) {
        return Array.from({ length: limit }).map((_, index) => {
            const iterador = index + 1
            return `${base} X ${iterador} = ${base * iterador}`
        }).join('\n')
    }

}
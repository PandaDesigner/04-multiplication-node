import fs from 'fs';
import path from 'path';

export class TableApp {
    private base: number;
    private limit: number;
    private show: boolean;

    constructor(base: number, limit: number, show: boolean) {
        this.base = base;
        this.limit = limit;
        this.show = show;
    }

    public setValueTable(base: number, limit: number, show: boolean) {
        this.base = base;
        this.limit = limit;
        this.show = show;
    }

    private headerTable() {
        return `
        ================================================
                           TABLA DEL ${this.base}             
        ================================================
        `;
    }

    private tabletBody() {
        let tablet = ''
        Array.from({ length: this.limit }).forEach((_item, index) => {
            const num = index + 1
            tablet += `                          ${this.base} X ${num} = ${this.base * num}             \n `;
        })
        return tablet
    }

    public showTable(): Promise<void> {
        return this.show
            ? Promise.resolve(console.log(this.startTable()))
            : Promise.resolve(console.log('File created!'));
    }

    private startTable() {
        return `
        ${this.headerTable()}
 ${this.tabletBody()}
        `;
    }

    public async PrintTable(): Promise<void> {
        const outDir = path.join(`outputs`);
        const outFile = path.join(outDir, `table-${this.base}.txt`);
        try {
            await fs.promises.mkdir(outDir, { recursive: true });
            await fs.promises.writeFile(outFile, this.startTable());
        } catch (error) {
            console.error('Error writing file:', error);
        }
    }
}
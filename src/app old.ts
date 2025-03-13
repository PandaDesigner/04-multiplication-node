import fs from 'fs'
import path from 'path';

const OUT_DIR = 'outputs';


const headerTable = (numRef: number) => {
    return `
    =============================================
                   TABLA del ${numRef}
    =============================================
    `
}

const tableBody = (numRef: number) => {
    let table = ''
    Array.from({ length: 10 }).forEach((item, _index) => {
        table += `                   ${numRef} X ${_index + 1} = ${numRef * (_index + 1)}\n`
    })

    return !!numRef ? table : 'no text'
}

const printTable = (numRef: number) => {
    const outputDir = path.join(`${__dirname}/${OUT_DIR}`)

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    const outFilePath = path.join(outputDir, `Multiplicacion x ${numRef}.txt`)

    const tablet = `
${headerTable(numRef)}
${tableBody(numRef)}
    `
    console.log(outFilePath)
    console.log(tablet)
    fs.writeFileSync(outFilePath, tablet)

}

printTable(6)

console.log('test')
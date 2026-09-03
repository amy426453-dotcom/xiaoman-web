import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load('/Users/carmen/Documents/新/outputs/bag_flow/书包模块完整流程.xlsx'));
console.log((await wb.inspect({kind:'sheet',include:'id,name'})).ndjson);
console.log((await wb.inspect({kind:'table',sheetId:'电脑模块',range:'A1:G30',include:'values',tableMaxRows:30,tableMaxCols:7,maxChars:15000})).ndjson);

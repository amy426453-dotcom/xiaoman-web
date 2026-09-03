import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/carmen/Documents/新/outputs/bag_flow";
await fs.mkdir(outputDir, { recursive: true });
const workbook = Workbook.create();
const sheet = workbook.worksheets.add("书包模块流程");
sheet.showGridLines = false;

sheet.getRange("A1:G1").merge();
sheet.getRange("A1").values = [["书包模块｜点击、弹窗与叙事条完整流程"]];
sheet.getRange("A2:G2").merge();
sheet.getRange("A2").values = [["状态链：关闭/未整理 → 打开/探索中 → 完成/收好"]];

const headers = [["步骤", "触发条件/用户操作", "弹窗标题与文案", "主按钮", "次按钮", "背景书包状态", "叙事条文案"]];
sheet.getRange("A4:G4").values = headers;
const rows = [
  ["1. 初始预览", "点击主场景中的书包", "标题：书包\n拉链还开着……先把里面的东西收拾好吧。", "打开书包", "返回房间", "关闭/未整理", "拉链还开着……先把里面的东西收拾好吧。"],
  ["2. 取消打开", "预览阶段点击返回房间", "预览弹窗关闭", "—", "—", "关闭/未整理", "拉链还开着……先把里面的东西收拾好吧。"],
  ["3. 打开书包", "点击打开书包", "标题：书包里的东西\n书包打开了，里面还有几样东西没有收好。", "继续查看", "返回房间", "打开/探索中", "拉链还开着……先把里面的东西收拾好吧。"],
  ["4. 部分探索", "查看一件或多件物品，但尚未全部看完", "显示对应物品详情/留言", "（查看第一件后隐藏）", "返回房间", "打开/探索中", "还剩 N 件东西，先看看下一件。"],
  ["5. 提前返回", "部分探索阶段点击返回房间", "弹窗关闭", "—", "—", "打开/探索中", "点一点房间里发光的东西，看看小满还没收好什么。"],
  ["6. 全部看完", "所有书包物品均已查看", "物品列表仍显示", "收好书包", "不显示返回房间", "打开/尚未收好", "都看过了，可以把书包收好了。"],
  ["7. 收好书包", "点击收好书包", "完成动作并关闭弹窗", "—", "—", "完成/收好（拉链闭合）", "书包已经整理好啦，看看房间还有什么没收拾。"],
  ["8. 完成后再次进入", "再次点击已收好的书包", "标题：书包\n拉链拉好了，重要的东西也都好好收着。", "已收好", "再检查一遍", "完成/收好", "书包已经整理好啦，看看房间还有什么没收拾。"],
  ["9. 再检查一遍", "完成状态点击再检查一遍", "重新显示已查看的物品列表，不重置进度", "已收好", "返回房间", "完成/收好", "书包已经整理好啦，看看房间还有什么没收拾。"],
  ["10. 完成后返回", "完成状态点击已收好或返回房间", "弹窗关闭", "—", "—", "完成/收好", "书包已经整理好啦，看看房间还有什么没收拾。"],
];
sheet.getRange("A5:G14").values = rows;

sheet.getRange("A16:G16").merge();
sheet.getRange("A16").values = [["按钮规则摘要"]];
sheet.getRange("A17:C20").values = [
  ["状态", "显示按钮", "说明"],
  ["关闭/未整理", "打开书包 + 返回房间", "预览阶段"],
  ["打开/探索中", "继续查看（初次打开时）+ 返回房间", "查看第一件物品后隐藏继续查看"],
  ["完成/收好", "已收好 + 再检查一遍", "再检查不重置完成状态"],
];

sheet.getRange("A1:G1").format = { fill: "#8B5E3C", font: { bold: true, color: "#FFFFFF", size: 16 }, horizontalAlignment: "center", verticalAlignment: "center" };
sheet.getRange("A2:G2").format = { fill: "#F6E7C8", font: { italic: true, color: "#6B4A32" }, horizontalAlignment: "center" };
sheet.getRange("A4:G4").format = { fill: "#D9A441", font: { bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
sheet.getRange("A5:G14").format = { font: { color: "#4A3425" }, verticalAlignment: "center", wrapText: true };
sheet.getRange("A5:A14").format.font = { bold: true, color: "#6B4A32" };
sheet.getRange("A16:G16").format = { fill: "#8B5E3C", font: { bold: true, color: "#FFFFFF", size: 12 }, horizontalAlignment: "left" };
sheet.getRange("A17:C17").format = { fill: "#D9A441", font: { bold: true, color: "#FFFFFF" }, horizontalAlignment: "center" };
sheet.getRange("A18:C20").format = { font: { color: "#4A3425" }, verticalAlignment: "center", wrapText: true };
sheet.getRange("A4:G14").format.borders = { preset: "all", style: "thin", color: "#D8B98A" };
sheet.getRange("A17:C20").format.borders = { preset: "all", style: "thin", color: "#D8B98A" };
sheet.getRange("A1:G20").format.font.name = "Microsoft YaHei";
sheet.getRange("A1:G1").format.rowHeight = 30;
sheet.getRange("A2:G2").format.rowHeight = 22;
sheet.getRange("A4:G4").format.rowHeight = 32;
sheet.getRange("A5:G14").format.rowHeight = 58;
sheet.getRange("A16:G16").format.rowHeight = 24;
sheet.getRange("A17:C20").format.rowHeight = 34;
sheet.getRange("A:A").format.columnWidth = 16;
sheet.getRange("B:B").format.columnWidth = 26;
sheet.getRange("C:C").format.columnWidth = 38;
sheet.getRange("D:E").format.columnWidth = 18;
sheet.getRange("F:F").format.columnWidth = 20;
sheet.getRange("G:G").format.columnWidth = 36;
sheet.freezePanes.freezeRows(4);

const check = await workbook.inspect({ kind: "table", range: "书包模块流程!A1:G20", include: "values", tableMaxRows: 20, tableMaxCols: 7 });
console.log(check.ndjson.slice(0, 1200));
const preview = await workbook.render({ sheetName: "书包模块流程", range: "A1:G20", scale: 1, format: "png" });
await fs.writeFile(`${outputDir}/preview.png`, new Uint8Array(await preview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(`${outputDir}/书包模块完整流程.xlsx`);

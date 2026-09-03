import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const path = "/Users/carmen/Documents/新/outputs/bag_flow/书包模块完整流程.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(path));

const modules = {
  "电脑模块": [
    ["1. 初次预览", "第一次点击电脑", "电脑预览图；屏幕还亮着，先看看这个熟悉的老朋友。", "打开电脑", "返回房间", "主场景电脑黑屏", "电脑屏幕还亮着，先看看这个熟悉的老朋友。"],
    ["2. 进入游戏", "点击打开电脑", "水果连连看 + 小满的农场游戏界面", "继续查看", "返回房间", "电脑亮屏", "屏幕里的小游戏和留言，都还在等你发现。"],
    ["3. 中途返回", "游戏未全部完成时点击返回房间", "关闭游戏弹窗", "—", "—", "电脑保持亮屏", "屏幕里的小游戏和留言，都还在等你发现。"],
    ["4. 连连看完成", "完成全部水果配对", "显示两行留言；提示一对按钮隐藏", "继续查看", "返回房间", "电脑保持亮屏", "屏幕里的小游戏和留言，都还在等你发现。"],
    ["5. 两个游戏完成", "连连看和农场都完成", "仍停留在游戏弹窗", "关闭电脑", "不显示返回房间", "电脑保持亮屏", "留言都看完啦，可以关闭电脑了。"],
    ["6. 关闭电脑", "点击关闭电脑", "关闭游戏弹窗", "—", "—", "电脑恢复黑屏", "电脑里的小游戏和留言，都看完了。\n桌子下面的抽屉，也该打开看看了。"],
    ["7. 完成后再次点击", "再次点击已完成电脑", "完成弹窗：电脑里的小游戏和留言，都看完了。", "关闭电脑", "再检查一遍", "电脑黑屏（弹窗打开时变亮）", "留言都看完啦，看看房间还有什么没收拾。"],
    ["8. 再检查一遍", "点击再检查一遍", "重新显示两个游戏，不重置完成状态", "关闭电脑", "返回房间", "电脑亮屏", "留言都看完啦，看看房间还有什么没收拾。"],
  ],
  "抽屉模块": [
    ["1. 初始预览", "点击抽屉", "抽屉预览；抽屉还没打开，先拉开它看看吧。", "打开抽屉", "返回房间", "抽屉关闭", "桌子下面那个抽屉，也好久没打开了。"],
    ["2. 打开抽屉", "点击打开抽屉", "显示抽屉物品列表", "继续查看", "返回房间", "抽屉打开", "抽屉拉开了，里面还有几件老物件。"],
    ["3. 部分探索", "查看部分物品后返回", "弹窗关闭，保留已查看状态", "继续查看", "返回房间", "抽屉打开", "抽屉里还有没看过的东西。"],
    ["4. 发现照片", "物品看完后查看抽屉照片", "显示照片并可查看线索", "继续查看", "返回房间", "抽屉打开", "抽屉底下好像还压着什么……"],
    ["5. 探索完成", "照片线索查看完成", "完成状态弹窗", "已收好", "再检查一遍", "抽屉完成/收好", "抽屉里的旧时光，暂时收拾好了。"],
    ["6. 再检查一遍", "完成状态点击再检查一遍", "重新显示抽屉物品和照片", "已收好", "返回房间", "抽屉完成/收好", "抽屉里的旧时光，暂时收拾好了。"],
  ],
  "MP3模块": [
    ["1. 初始状态", "点击MP3", "MP3关闭预览图；耳机线已经接好，播放一段小满收藏的歌吧。", "开始播放", "返回房间", "MP3关闭", "耳机里的夏天，还等着被重新听见。"],
    ["2. 播放中", "点击开始播放", "显示MP3播放器和音频控件", "继续播放/暂停播放", "返回房间", "MP3播放状态", "这首歌一响起，那个夏天好像又回来了……"],
    ["3. 中途返回", "播放未满30秒时返回", "关闭弹窗并暂停音频", "—", "—", "MP3保持播放素材状态", "点一点房间里发光的东西，看看小满还没收好什么。"],
    ["4. 播放完成", "累计播放满30秒", "显示已听过30秒状态", "继续播放", "返回房间", "MP3播放完成", "这段旋律，小满还想再听一会儿。"],
    ["5. 再次进入", "点击已播放MP3", "恢复播放器和播放进度状态", "继续播放", "返回房间", "MP3播放状态", "耳机里的夏天，又听完了一小段。"],
  ],
  "纸箱模块": [
    ["1. 未解锁", "前四个区域未完成时点击纸箱", "纸箱保持锁定，不进入内容", "—", "返回房间", "纸箱封闭", "这个最后再收，先看看房间里还有什么。"],
    ["2. 解锁预览", "前四个区域完成后点击纸箱", "显示解锁状态预览图", "打开纸箱", "返回房间", "纸箱解锁但未打开", "房间里的东西都收拾好了，最后看看角落里的纸箱吧。"],
    ["3. 打开纸箱", "点击打开纸箱", "显示纸箱物品列表", "继续查看", "返回房间", "纸箱打开", "纸箱打开了，里面是搬家前最后要收好的东西。"],
    ["4. 部分探索", "查看部分纸箱物品后返回", "关闭弹窗，保留已查看状态", "继续查看", "返回房间", "纸箱打开", "纸箱里还有没看过的东西。"],
    ["5. 查看照片", "查看全班合照并翻看背面", "显示照片正反面和背面文字", "收好纸箱", "返回房间", "纸箱打开", "原来是我亲爱的同桌给我的惊喜！"],
    ["6. 收好纸箱", "点击收好纸箱", "完成并关闭弹窗", "—", "—", "纸箱合上", "这个夏天，也该好好告别了。"],
  ],
};

for (const [name, rows] of Object.entries(modules)) {
  const old = workbook.worksheets.getItemOrNullObject(name);
  if (old && !old.isNullObject) old.delete();
  const sheet = workbook.worksheets.add(name);
  sheet.showGridLines = false;
  sheet.getRange("A1:G1").merge();
  sheet.getRange("A1").values = [[`${name}｜点击、弹窗与叙事条完整流程`]];
  sheet.getRange("A2:G2").merge();
  sheet.getRange("A2").values = [["流程字段：步骤｜触发条件/用户操作｜弹窗标题与文案｜主按钮｜次按钮｜背景状态｜叙事条文案"]];
  sheet.getRange("A4:G4").values = [["步骤", "触发条件/用户操作", "弹窗标题与文案", "主按钮", "次按钮", "背景状态", "叙事条文案"]];
  sheet.getRange(`A5:G${4 + rows.length}`).values = rows;
  sheet.getRange("A1:G1").format = { fill: "#8B5E3C", font: { bold: true, color: "#FFFFFF", size: 16 }, horizontalAlignment: "center", verticalAlignment: "center" };
  sheet.getRange("A2:G2").format = { fill: "#F6E7C8", font: { italic: true, color: "#6B4A32" }, horizontalAlignment: "center" };
  sheet.getRange("A4:G4").format = { fill: "#D9A441", font: { bold: true, color: "#FFFFFF" }, horizontalAlignment: "center", wrapText: true };
  sheet.getRange(`A5:G${4 + rows.length}`).format = { font: { color: "#4A3425" }, verticalAlignment: "center", wrapText: true };
  sheet.getRange(`A5:A${4 + rows.length}`).format.font = { bold: true, color: "#6B4A32" };
  sheet.getRange(`A4:G${4 + rows.length}`).format.borders = { preset: "all", style: "thin", color: "#D8B98A" };
  sheet.getRange("A1:G1").format.rowHeight = 30;
  sheet.getRange("A2:G2").format.rowHeight = 22;
  sheet.getRange("A4:G4").format.rowHeight = 32;
  sheet.getRange(`A5:G${4 + rows.length}`).format.rowHeight = 58;
  sheet.getRange("A:A").format.columnWidth = 18;
  sheet.getRange("B:B").format.columnWidth = 28;
  sheet.getRange("C:C").format.columnWidth = 40;
  sheet.getRange("D:E").format.columnWidth = 18;
  sheet.getRange("F:F").format.columnWidth = 22;
  sheet.getRange("G:G").format.columnWidth = 38;
  sheet.freezePanes.freezeRows(4);
}

const preview = await workbook.render({ sheetName: "电脑模块", range: "A1:G12", scale: 1, format: "png" });
await fs.writeFile("/Users/carmen/Documents/新/outputs/bag_flow/computer-preview.png", new Uint8Array(await preview.arrayBuffer()));
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(path);

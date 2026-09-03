import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/Users/carmen/Documents/新/outputs/2026-08-08-xiaoman-assets";
const outputPath = `${outputDir}/小满素材清单.xlsx`;
const previewPath = `${outputDir}/小满素材清单预览.png`;

const rows = [];
const add = (batch, category, type, item, file, requirement, size, priority, note = "") => {
  rows.push([batch, category, type, item, file, requirement, size, priority, "未准备", note]);
};

// P0
add("第一批", "场景", "图片", "儿童房背景", "场景_儿童房背景_默认_桌面.webp", "傍晚暖橙色儿童房；白墙、海报、奖状、书桌、床边、窗户和封闭纸箱清晰可见；互动小物件不画死在前景。", "1920×1080 / WebP", "高");
add("第一批", "场景", "图片", "完整合成示意", "场景_完整合成示意_桌面.webp", "完整标明小满、五个区域、物件大小、坐标和遮挡关系，仅供开发对位。", "1920×1080 / WebP", "高", "不直接显示");
add("第一批", "场景", "图片", "身高刻度默认", "场景_身高刻度_默认_桌面.webp", "独立透明墙面图层；只含 122/128/135/142/149/156 cm，前五条褪色，最后一条清晰。", "透明 PNG/WebP", "中");
add("第一批", "场景", "图片", "身高刻度高亮", "场景_身高刻度_六年级高亮_桌面.webp", "可选；只高亮 156 cm，能叠加网页光效。", "透明 PNG/WebP", "低", "可由网页实现");
add("第一批", "角色", "图片", "小满站立", "角色_小满_站立_桌面.webp", "短碎发、白色短袖、卡其色短裤、白色足球长袜，只穿袜子；自然站立。", "1000×1000 / 透明 PNG/WebP", "高");
for (let i = 1; i <= 4; i++) add("第一批", "角色", "图片", `小满走路第${i}帧`, `角色_小满_走路_0${i}_桌面.webp`, "四帧连续步行动作；四分之三侧面；双脚落点、画布尺寸和角色比例一致。", "1000×1000 / 透明 PNG/WebP", "高");
add("第一批", "区域默认", "图片", "旧书包关闭", "书包_旧书包_关闭_桌面.webp", "拉链半开，露出红领巾一角；主体边缘清楚，方便网页定位。", "透明 PNG/WebP", "高");
add("第一批", "区域默认", "图片", "旧电脑关闭", "电脑_旧电脑_关闭_桌面.webp", "黑屏、灰尘和微弱电源灯；屏幕内容由网页动态渲染。", "透明 PNG/WebP", "高");
add("第一批", "区域默认", "图片", "床边抽屉关闭", "抽屉_床边抽屉_关闭_桌面.webp", "黄铜拉手、轻微缝隙和一角彩色纸片；可叠加拖开动画。", "透明 PNG/WebP", "高");
add("第一批", "区域默认", "图片", "MP3关闭", "MP3_MP3_关闭_桌面.webp", "蓝色 LCD 熄灭，耳机线处于缠绕状态。", "透明 PNG/WebP", "高");
add("第一批", "区域默认", "图片", "搬家纸箱封闭", "纸箱_搬家纸箱_封闭_桌面.webp", "X 型胶带封口，明确表示暂时不可打开。", "透明 PNG/WebP", "高");
for (const [item, file] of [["书包进度图标","进度_书包_线稿_桌面.webp"],["电脑进度图标","进度_电脑鼠标_线稿_桌面.webp"],["抽屉进度图标","进度_抽屉拉手_线稿_桌面.webp"],["MP3进度图标","进度_MP3耳机_线稿_桌面.webp"],["纸箱进度图标","进度_纸箱_线稿_桌面.webp"]]) add("第一批", "UI", "图片", item, file, "透明线稿；尺寸比例统一；未完成降低透明度，完成由网页添加颜色和光晕。", "透明 PNG/WebP", "高");
add("第一批", "UI", "字体", "小满手写字体", "字体_小满手写.woff2", "覆盖常用中文、数字和标点；用于动态标题、旁白、纸条、档案标签和照片背面文字。", "WOFF2", "高", "需确认网页授权");

// P1 character actions
for (const [item, file, req] of [
  ["小满整理书包", "角色_小满_整理书包_桌面.webp", "蹲下或弯腰，双手靠近书包，表现翻找物品。"],
  ["小满电脑前", "角色_小满_电脑前_桌面.webp", "坐在旧电脑前，朝向屏幕，手臂可见。"],
  ["小满拉抽屉", "角色_小满_拉抽屉_桌面.webp", "蹲在抽屉旁，一只手靠近拉手，表现用力拉开。"],
  ["小满听 MP3", "角色_小满_听MP3_桌面.webp", "戴白色耳机，身体放松，可轻微晃腿或闭眼。"],
  ["小满纸箱旁", "角色_小满_纸箱旁_桌面.webp", "跪坐或蹲在纸箱旁，双手靠近箱盖或箱内物件。"],
  ["小满门口回望", "角色_小满_门口回望_桌面.webp", "站在门口回头看整理后的房间，用于无台词结尾镜头。"]
]) add("第二批", "角色", "图片", item, file, req, "1000×1000 / 透明 PNG/WebP", "中");

// School bag
for (const [item, file, req, size = "透明 PNG/WebP", priority = "中"] of [
  ["旧书包打开", "书包_旧书包_打开_桌面.webp", "拉链完全打开，内部留出七件物品叠放空间。"],
  ["旧书包完成", "书包_旧书包_完成_桌面.webp", "可选；表现物品归位、拉链合上和纸条落在旁边。", "透明 PNG/WebP", "低"],
  ["红领巾展开", "书包_红领巾_展开_桌面.webp", "红色布料、边缘轻微磨损，适合拖拽和折叠。"],
  ["红领巾叠好", "书包_红领巾_叠好_桌面.webp", "折叠整齐，与展开图保持真实比例。"],
  ["校牌正面", "书包_校牌_正面_桌面.webp", "可读“小满 / 六一班”；照片为原创角色。"],
  ["校牌背面", "书包_校牌_背面_桌面.webp", "背面有磨损、胶印或别针痕迹；文字可动态显示。"],
  ["大队长章", "书包_大队长章_默认_桌面.webp", "红黄配色、金属或塑料反光，适合长按发光。"],
  ["密码本关闭", "书包_密码本_关闭_桌面.webp", "带四位数字密码锁；封面有使用痕迹但不放死正文。"],
  ["密码本打开", "书包_密码本_打开_桌面.webp", "有手写页、涂鸦和空白文字区域；正文动态排版。"],
  ["喜羊羊铅笔盒关闭", "书包_喜羊羊铅笔盒_关闭_桌面.webp", "蓝色系卡通铅笔盒，盒盖可弹开；公开版需确认授权或改原创。"],
  ["喜羊羊铅笔盒打开", "书包_喜羊羊铅笔盒_打开_桌面.webp", "可见铅笔、橡皮、小尺子和课程表，小物件可网页叠加。"],
  ["新华字典关闭", "书包_新华字典_关闭_桌面.webp", "封面磨损、边角卷起，书名清晰。"],
  ["新华字典打开", "书包_新华字典_打开_桌面.webp", "翻到“朋友”相关释义，页角有折痕，具体文字动态处理。"],
  ["跳绳展开", "书包_跳绳_展开_桌面.webp", "绳身拉直，手柄有磨损，适合拉直动作。"],
  ["跳绳卷起", "书包_跳绳_卷起_桌面.webp", "绳身自然卷起，适合放回书包。"],
  ["同桌纸条", "书包_同桌纸条_正面_桌面.webp", "只提供纸张、折痕和污渍；生日密码和正文动态排版。"]
]) add("第三批", "书包", "图片", item, file, req, size, priority);

// Computer
add("第四批", "电脑", "图片", "旧电脑开机", "电脑_旧电脑_开机_桌面.webp", "屏幕亮起但不嵌入 7k7k、QQ 或农场截图；屏幕区域留作 HTML/CSS 界面。", "透明 PNG/WebP", "中");
add("第四批", "电脑", "图片", "鼠标", "电脑_鼠标_默认_桌面.webp", "旧式有线鼠标，线缆可单独呈现点击移动。", "透明 PNG/WebP", "中");
add("第四批", "电脑", "图片", "旧电脑完成", "电脑_旧电脑_完成_桌面.webp", "可选；显示器变暗、桌面图标变灰；也可网页实现。", "透明 PNG/WebP", "低");
add("第四批", "电脑", "网页制作项", "7k7k 连连看界面", "网页动态组件", "原创 4×4 棋盘、8 对卡片、一次提示高亮和成功反馈；不复制官方页面。", "HTML/CSS/JS", "高");
add("第四批", "电脑", "网页制作项", "QQ 农场界面", "网页动态组件", "原创农场、成熟作物、杂草、收菜动作和同桌留言；不复制官方页面。", "HTML/CSS/JS", "高");

// Drawer
for (const [item, file, req, priority = "中"] of [
  ["抽屉打开", "抽屉_床边抽屉_打开_桌面.webp", "抽屉拉开，内部有多层摆放空间和自然景深。"],
  ["抽屉完成", "抽屉_床边抽屉_完成_桌面.webp", "可选；展示六件物品已查看、照片一角露出。", "低"],
  ["水晶糖纸", "抽屉_水晶糖纸_默认_桌面.webp", "半透明彩色糖纸，有折痕，移动到光线处能透出颜色。"],
  ["东南西北折起", "抽屉_东南西北_折起_桌面.webp", "四角折叠完整，纸张略旧，支持点击展开。"],
  ["东南西北展开", "抽屉_东南西北_展开_桌面.webp", "展开后内部留白，方向、数字和文字由网页显示。"],
  ["比巴卜泡泡糖", "抽屉_比巴卜泡泡糖_默认_桌面.webp", "空盒或糖纸，颜色鲜明但有轻微磨损，晃动时有轻响。"],
  ["爆笑校园封面", "抽屉_爆笑校园_封面_桌面.webp", "原创拟态封面，不复制官方封面；书角磨损、带涂鸦。"],
  ["爆笑校园内页", "抽屉_爆笑校园_内页_桌面.webp", "原创校园漫画内页，不使用原作角色和原文。"],
  ["陀螺", "抽屉_陀螺_默认_桌面.webp", "男孩收藏，有轻微划痕，适合旋转和停转。"],
  ["玻璃弹珠", "抽屉_玻璃弹珠_默认_桌面.webp", "透明玻璃质感，内部蓝绿色花纹，适合滚动和高光。"],
  ["全班合照一角", "抽屉_全班合照_一角_桌面.webp", "只露边角和局部颜色，不能提前看到完整人物。"],
  ["合照背面朝上", "纸箱_全班合照_背面朝上_桌面.webp", "正面朝下的照片纸张和边缘；背面文字动态排版。"]
]) add("第五批", "抽屉", "图片", item, file, req, "透明 PNG/WebP", priority);

// MP3
for (const [item, file, req, priority = "中"] of [
  ["MP3播放", "MP3_MP3_播放_桌面.webp", "LCD 背光亮起，歌名和进度由网页动态显示。"],
  ["MP3完成", "MP3_MP3_完成_桌面.webp", "可选；播放结束后屏幕转暗、保留一点余光。", "低"],
  ["耳机缠绕", "MP3_耳机_缠绕_桌面.webp", "白色有线耳机，线缆自然缠绕，适合点击解开。"],
  ["耳机解开", "MP3_耳机_解开_桌面.webp", "白色耳机线展开，线条清楚，适合戴上动作。"]
]) add("第六批", "MP3", "图片", item, file, req, "透明 PNG/WebP", priority);

// Box
for (const [item, file, req, priority = "中"] of [
  ["纸箱解锁", "纸箱_搬家纸箱_解锁_桌面.webp", "X 型胶带裂开或移除，表示四个区域已完成。"],
  ["纸箱打开", "纸箱_搬家纸箱_打开_桌面.webp", "同时摆放通知、钥匙、书包、校服、照片，并保留个人物件空位。"],
  ["纸箱合上", "纸箱_搬家纸箱_合上_桌面.webp", "箱盖合上，用于结尾回望镜头，不遮挡角色动作。"],
  ["实验中学报到通知", "纸箱_实验中学报到通知_默认_桌面.webp", "泛黄纸张、折痕和印章区域；学校名、日期和时间动态排版。"],
  ["新家钥匙", "纸箱_新家钥匙_默认_桌面.webp", "普通钥匙加挂件；开发版可用长江七号，公开版建议原创绿色外星挂件。"],
  ["黑色双肩书包", "纸箱_黑色双肩书包_默认_桌面.webp", "普通黑色双肩包，略显宽大、保持崭新。"],
  ["黑色书包拉链微开", "纸箱_黑色双肩书包_拉链微开_桌面.webp", "可选；拉链开一小段，便于放大查看内部。", "低"],
  ["实验中学校服折叠", "纸箱_实验中学校服_折叠_桌面.webp", "蓝白长袖外套和长裤，整齐折叠，露出衣领或蓝色侧条纹。"],
  ["实验中学校服展开", "纸箱_实验中学校服_展开_桌面.webp", "可选；露出实验中学布标和内侧姓名贴。", "低"],
  ["全班合照正面", "纸箱_全班合照_正面_桌面.webp", "原创插画；约 30 位同学、实验小学门口、统一夏季校服、傍晚暖橙色阳光。"],
  ["全班合照背面", "纸箱_全班合照_背面_桌面.webp", "有折痕的照片背面；告别文字由网页动态排版。"]
]) add("第七批", "纸箱", "图片", item, file, req, "透明 PNG/WebP", priority);

// Optional UI and AI placeholder
for (const [item, file, req] of [
  ["纸条底图", "UI_纸条底图_默认.webp", "可选；旧纸条纹理和折痕，不含固定文字。"],
  ["手写记忆贴纸", "UI_手写记忆贴纸_默认.webp", "可选；小尺寸便签底图，文字由网页写入。"],
  ["档案标签", "UI_档案标签_默认.webp", "可选；半透明博物馆标签底图，编号和说明由网页写入。"],
  ["AI个人物件占位", "AI_个人物件_占位_桌面.webp", "可选；开发期透明单件占位图，最终替换为 AI 1024×1024 结果。"]
]) add("第九批", "UI/AI", "图片", item, file, req, "PNG/WebP", "低");

// Audio
for (const [item, file, req, priority = "中"] of [
  ["风扇循环", "audio/ambience/fan-loop.wav", "8–15 秒可无缝循环；低频稳定，不盖住文字提示。"],
  ["蝉鸣循环", "audio/ambience/cicadas-loop.wav", "15–30 秒可无缝循环；夏夜氛围，不尖锐。"],
  ["远处电视循环", "audio/ambience/distant-tv-loop.wav", "15–30 秒循环；模糊声场，不出现可识别台词。"],
  ["楼下孩子声循环", "audio/ambience/children-downstairs-loop.wav", "15–30 秒循环；远处低音量，不可辨认具体对话。"],
  ["房间 BGM", "audio/music/room-bgm-loop.wav", "90–120 秒无缝循环；轻快卡通游戏感；原创或已授权；无歌词。"],
  ["纸箱钢琴 BGM", "audio/music/box-piano-loop.wav", "30–60 秒可循环；比主 BGM 安静，适合告别段落。"],
  ["《童年》授权音频", "audio/music/tongnian-licensed.mp3", "用户提供且取得网页播放授权；附授权说明和允许播放时长。", "高"],
  ["UI点击", "audio/sfx/ui-click.wav", "短促、轻巧、可重复播放。"],
  ["纸张摩擦", "audio/sfx/paper-rustle.wav", "真实纸张摩擦，尾音短。"],
  ["纸箱轻晃", "audio/sfx/box-shake.wav", "低音量纸箱和内部物件轻碰。"],
  ["胶带撕裂", "audio/sfx/box-tape-tear.wav", "纸胶带裂开声，用于纸箱解锁。"],
  ["纸箱打开", "audio/sfx/box-open.wav", "箱盖打开和纸板摩擦声。"],
  ["纸箱合上", "audio/sfx/box-close.wav", "轻柔纸箱合上声，用于结尾。"],
  ["书包拉链", "audio/sfx/bag-zipper.wav", "旧拉链略卡顿但不刺耳。"],
  ["物件落下", "audio/sfx/object-drop-soft.wav", "文具或小物件落入书包的柔和碰撞。"],
  ["密码按钮", "audio/sfx/password-button.wav", "数字按键咔哒声。"],
  ["密码错误", "audio/sfx/password-error-click.wav", "轻微锁扣卡住声，配合密码本抖动。"],
  ["电脑开机", "audio/sfx/computer-boot.wav", "旧电脑开机提示声，不复制具体系统音。"],
  ["鼠标点击", "audio/sfx/mouse-click.wav", "旧式鼠标按键声。"],
  ["连连看成功", "audio/sfx/match-success.wav", "轻快配对成功反馈。"],
  ["连连看提示", "audio/sfx/match-hint.wav", "一次提示高亮时的轻声提示。"],
  ["农场收菜", "audio/sfx/farm-harvest.wav", "作物收取的轻快声音。"],
  ["农场除草", "audio/sfx/farm-weed.wav", "除草的细碎动作声。"],
  ["抽屉拉开", "audio/sfx/drawer-pull.wav", "木质抽屉摩擦声，带轻微吱呀。"],
  ["糖纸摩擦", "audio/sfx/candy-wrapper.wav", "透明糖纸被拿起和对光移动的细碎声。"],
  ["折纸展开", "audio/sfx/fold-paper.wav", "东南西北展开的纸张声。"],
  ["漫画翻页", "audio/sfx/book-page-turn.wav", "旧漫画翻页声。"],
  ["陀螺旋转", "audio/sfx/top-spin.wav", "陀螺启动、旋转和停止的短音效。"],
  ["弹珠滚动", "audio/sfx/marble-roll.wav", "玻璃弹珠滚动和停下的声音。"],
  ["MP3按钮", "audio/sfx/mp3-button.wav", "播放器按钮按下声。"],
  ["耳机解开", "audio/sfx/earphones-untangle.wav", "耳机线被解开的轻微摩擦声。"],
  ["钥匙碰撞", "audio/sfx/key-jingle.wav", "钥匙和挂件轻轻碰撞。"],
  ["校服展开", "audio/sfx/fabric-unfold.wav", "衣物展开的布料声。"],
  ["照片翻面", "audio/sfx/photo-flip.wav", "照片翻面和纸张轻响。"],
  ["个人物件落入纸箱", "audio/sfx/personal-object-land.wav", "访客生成物件落入纸箱的轻微碰撞声。"]
]) add("第八批", "音频", "音频", item, file, req, "WAV/高质量 MP3", priority);

const workbook = Workbook.create();
const sheet = workbook.worksheets.add("素材清单");
const guide = workbook.worksheets.add("填写说明");
sheet.showGridLines = false;
guide.showGridLines = false;

const title = sheet.getRange("A1:J1");
title.merge();
title.values = [["小满的纸箱里，装着整个夏天｜桌面端素材清单"]];
title.format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF", size: 16 }, horizontalAlignment: "center", verticalAlignment: "center" };
title.format.rowHeight = 30;

sheet.getRange("A2:B3").values = [
  ["总素材数", null],
  ["已完成素材", null],
];
sheet.getRange("C2:C3").formulas = [[`=COUNTA(E6:E${rows.length + 5})`], [`=COUNTIF(I6:I${rows.length + 5},"已完成")`]];
sheet.getRange("E2:F3").values = [["未完成素材", null], ["说明", "状态列可下拉选择：未准备 / 准备中 / 已完成"]];
sheet.getRange("G2").formulas = [[`=COUNTIF(I6:I${rows.length + 5},"未准备")+COUNTIF(I6:I${rows.length + 5},"准备中")`]];
sheet.getRange("A2:H3").format = { fill: "#F3F6F9", font: { color: "#1F2937" }, verticalAlignment: "center" };
sheet.getRange("A2:A3").format.font = { bold: true, color: "#1F4E78" };
sheet.getRange("E2:E3").format.font = { bold: true, color: "#1F4E78" };

const headers = [["批次", "类别", "交付类型", "素材名称", "文件名或标识", "具体制作要求", "尺寸 / 格式", "优先级", "状态", "备注"]];
sheet.getRange("A5:J5").values = headers;
sheet.getRange("A5:J5").format = { fill: "#D9EAF7", font: { bold: true, color: "#1F2937" }, horizontalAlignment: "center", verticalAlignment: "center", wrapText: true };
sheet.getRange("A5:J5").format.rowHeight = 28;
sheet.getRange(`A6:J${rows.length + 5}`).values = rows;
const body = sheet.getRange(`A6:J${rows.length + 5}`);
body.format = { font: { color: "#1F2937", size: 10 }, verticalAlignment: "top", wrapText: true };
body.format.borders = { insideHorizontal: { style: "thin", color: "#D9E2F3" }, bottom: { style: "thin", color: "#D9E2F3" } };
sheet.getRange(`I6:I${rows.length + 5}`).dataValidation = { rule: { type: "list", values: ["未准备", "准备中", "已完成"] } };
sheet.getRange(`H6:H${rows.length + 5}`).dataValidation = { rule: { type: "list", values: ["高", "中", "低"] } };

sheet.getRange(`I6:I${rows.length + 5}`).conditionalFormats.add("containsText", { text: "已完成", format: { fill: "#D9EAD3", font: { color: "#274E13", bold: true } } });
sheet.getRange(`I6:I${rows.length + 5}`).conditionalFormats.add("containsText", { text: "准备中", format: { fill: "#FFF2CC", font: { color: "#7F6000", bold: true } } });
sheet.getRange(`H6:H${rows.length + 5}`).conditionalFormats.add("containsText", { text: "高", format: { fill: "#FCE4D6", font: { color: "#9C0006", bold: true } } });

for (const [col, width] of [["A:A", 12], ["B:B", 14], ["C:C", 12], ["D:D", 22], ["E:E", 34], ["F:F", 68], ["G:G", 22], ["H:H", 10], ["I:I", 12], ["J:J", 18]]) sheet.getRange(col).format.columnWidth = width;
sheet.getRange(`A6:J${rows.length + 5}`).format.rowHeight = 44;
sheet.freezePanes.freezeRows(5);
sheet.freezePanes.freezeColumns(4);

guide.getRange("A1:F1").merge();
guide.getRange("A1").values = [["填写说明"]];
guide.getRange("A1:F1").format = { fill: "#1F4E78", font: { bold: true, color: "#FFFFFF", size: 16 }, horizontalAlignment: "center", verticalAlignment: "center" };
guide.getRange("A3:B8").values = [
  ["怎么使用", "每个素材一行；制作完成后在“状态”列选择“已完成”。"],
  ["状态", "未准备：尚未开始；准备中：已开始制作；已完成：文件已交付并通过检查。"],
  ["优先级", "高：可阻塞对应开发；中：完成互动所需；低：可用网页或 CSS 替代。"],
  ["桌面尺寸", "首版只做桌面端，场景基准 1920×1080，安全区域 1600×900。"],
  ["动态文字", "标题、密码本、纸条、报到通知、合照背面和档案文字由网页排版，不要做成图片。"],
  ["音频", "不需要人物配音；只准备环境声、BGM、动作音效和已授权《童年》。"],
];
guide.getRange("A3:B8").format = { wrapText: true, verticalAlignment: "top", font: { color: "#1F2937", size: 11 } };
guide.getRange("A3:A8").format = { fill: "#D9EAF7", font: { bold: true, color: "#1F4E78" }, verticalAlignment: "top" };
guide.getRange("A3:B8").format.borders = { insideHorizontal: { style: "thin", color: "#D9E2F3" }, bottom: { style: "thin", color: "#D9E2F3" } };
guide.getRange("A:A").format.columnWidth = 18;
guide.getRange("B:B").format.columnWidth = 80;
guide.getRange("A3:B8").format.rowHeight = 34;
guide.freezePanes.freezeRows(1);

await fs.mkdir(outputDir, { recursive: true });
const check = await workbook.inspect({ kind: "table", range: `素材清单!A1:J20`, include: "values,formulas", tableMaxRows: 20, tableMaxCols: 10, tableMaxCellChars: 120 });
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });
console.log(check.ndjson);
console.log(errors.ndjson);
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
const preview = await workbook.render({ sheetName: "素材清单", range: "A1:J24", scale: 1.2, format: "png" });
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
console.log(JSON.stringify({ outputPath, previewPath, assetCount: rows.length }));

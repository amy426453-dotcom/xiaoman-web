import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("room.html", import.meta.url), "utf8");
const script = readFileSync(new URL("room.js", import.meta.url), "utf8");

test("drawer contains six keepsakes and a hidden photo clue", () => {
  assert.equal((html.match(/data-drawer-item=/g) ?? []).length, 6);
  assert.match(html, /data-drawer-photo[^>]*hidden/);
  assert.match(script, /只露出了一角……完整的合照，也许已经被收进纸箱了。/);
});

test("switching regions hides content from the previous module", () => {
  assert.match(script, /bagItemsPanel\.hidden = region !== "bag" \|\| regionStates\.bag !== "open";/);
  assert.match(script, /noteDetail\.hidden = true;/);
  assert.match(script, /passwordDetail\.hidden = true;/);
});

test("MP3 uses the project song and completes after thirty seconds without stopping playback", () => {
  assert.match(html, /\.\.\/素材\/音频\/audio\/music\/tongnian-licensed\.mp3/);
  assert.match(html, /data-mp3-audio[^>]*controlslist="nodownload"/);
  assert.match(script, /MP3_COMPLETION_SECONDS = 30/);
  assert.match(script, /currentTime >= MP3_COMPLETION_SECONDS/);
  assert.match(script, /mp3Audio\.pause\(\)/, "audio may pause only through an explicit user action or module exit");
});

test("MP3 playback controls use the requested sound effects", () => {
  assert.match(script, /const mp3StartSfx = new Audio\("素材\/音频\/audio\/sfx\/mp3-button\.mp3"\)/);
  assert.match(script, /const mp3ButtonSfx = new Audio\("素材\/音频\/audio\/sfx\/mp3-button\.mp3"\)/);
  assert.match(script, /mp3ButtonSfx\.play\(\)\.catch\(\(\) => \{\}\);[\s\S]*if \(mp3Audio\.paused\) mp3Audio\.play\(\);/);
  assert.match(script, /mp3StartSfx\.play\(\)\.catch\([\s\S]*mp3Audio\.play\(\);/);
  assert.doesNotMatch(script, /mp3StartSfx\.onended/);
  assert.match(script, /mp3Audio\.addEventListener\("play", \(\) => \{[\s\S]*mp3ButtonSfx\.play\(\)\.catch/);
  assert.match(script, /mp3Audio\.addEventListener\("pause", \(\) => \{[\s\S]*mp3ButtonSfx\.play\(\)\.catch/);
});

test("computer completion controls use shutdown and boot sound effects", () => {
  assert.match(script, /const computerCloseSfx = new Audio\("素材\/音频\/audio\/sfx\/电脑关机\.MP3"\)/);
  assert.match(script, /focusClose\.textContent === "再检查一遍"\) \{[\s\S]*computerBootSfx\.play\(\)\.catch\(\(\) => \{\}\)/);
  assert.match(script, /if \(computerIsComplete\(\)\) \{[\s\S]*computerCloseSfx\.play\(\)\.catch\(\(\) => \{\}\)/);
});

test("MP3 dialog leaves whitespace for the story strip without scrolling", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="mp3"\] \.room-focus-card \{[^}]*top: 44%;[^}]*max-height: none;[^}]*overflow: visible;[^}]*scale\(\.9\);/s);
});

test("MP3 story strip sits lower while retaining bottom whitespace", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="mp3"\] \.room-thought \{ bottom: 3%; z-index: 7;/);
});

test("drawer opening story strip does not duplicate the dialog copy", () => {
  assert.match(script, /thought\.textContent = "快打开抽屉，看看抽屉里藏着哪些回忆。";/);
});

test("bag opening story strip uses the requested guide copy", () => {
  assert.match(script, /bag: "快打开书包看看里面藏着哪些回忆！"/);
});

test("computer preview places its copy above the image and uses the requested guide", () => {
  assert.match(html, /<h1 id="computer-preview-title">电脑<\/h1>[\s\S]*<p>屏幕还亮着，先看看这个熟悉的老朋友。<\/p>[\s\S]*computer-preview-card__image/);
  assert.match(script, /thought\.textContent = "快打开电脑看看里面藏着哪些回忆！";/);
});

test("computer exploration hides the default discovery story strip", () => {
  assert.match(script, /thought\.hidden = !completionPrompt;[\s\S]*: "";/);
});

test("completed matching note appears below the board", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /computer-app-panel:has\(\.computer-app-hint\.is-memory-note\) \.match-board \{ order: 1; \}/);
  assert.match(css, /computer-app-panel:has\(\.computer-app-hint\.is-memory-note\) \.computer-app-hint \{ order: 2; \}/);
});

test("only the selected computer game panel can be visible", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.computer-app-panel\[hidden\] \{ display: none !important; \}/);
});

test("completed matching dialog keeps cards intact while tightening spacing", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /room-focus-card\.is-complete:has\(\[data-computer-panel="match"\]:not\(\[hidden\]\)\) \{ padding: 10px 12px; \}/);
  assert.match(css, /room-focus-card\.is-complete:has\(\[data-computer-panel="match"\]:not\(\[hidden\]\)\) \.match-board \{ margin-bottom: 4px; \}/);
});

test("MP3 module uses its dedicated summer-memory story line", () => {
  assert.match(script, /thought\.textContent = "这首歌一响起，那个夏天好像又回来了……";/);
});

test("MP3 always resets its secondary action to return to the room", () => {
  assert.match(script, /if \(region === "mp3"\) \{[\s\S]*focusClose\.hidden = false;[\s\S]*focusClose\.textContent = "返回房间"/);
});

test("closing MP3 restores the default room story line", () => {
  assert.match(html, /data-thought>点一点房间里发光的物品，看看小满还没收好什么。<\/p>/);
  assert.match(script, /const DEFAULT_ROOM_GUIDE = "点一点房间里发光的物品，看看小满还没收好什么。"/);
  assert.match(script, /closingRegion === "mp3"[\s\S]*regionStates\.mp3Completed[\s\S]*DEFAULT_ROOM_GUIDE/);
});

test("unfinished modules restore room copy while completed modules show the next story prompt", () => {
  assert.match(script, /closingRegion === "bag"[\s\S]*completedStoryPrompt\("bag"\)[\s\S]*DEFAULT_ROOM_GUIDE/);
  assert.match(script, /closingRegion === "drawer"[\s\S]*drawerPhotoSeen[\s\S]*completedStoryPrompt\("drawer"\)[\s\S]*DEFAULT_ROOM_GUIDE/);
  assert.match(script, /closingRegion === "box"[\s\S]*boxPhotoSeen[\s\S]*completedStoryPrompt\("box"\)[\s\S]*DEFAULT_ROOM_GUIDE/);
  assert.match(script, /closingRegion === "computer" && !computerIsComplete\(\)[\s\S]*thought\.textContent = DEFAULT_ROOM_GUIDE/);
});

test("story prompts follow the recommended bag computer drawer MP3 box sequence", () => {
  assert.match(script, /function nextStoryPrompt\(\)[\s\S]*先看看书包吧，里面好像还有东西没拿出来。[\s\S]*对了，电脑里好像还有同桌给我的留言。[\s\S]*桌子下面那个抽屉，也好久没打开了。[\s\S]*差点忘了，MP3 还没收起来呢。[\s\S]*最后看看角落里的纸箱吧。[\s\S]*房间终于收拾好了。/);
});

test("completed story prompts state the current module before guiding to the next one", () => {
  assert.match(script, /function completedStoryPrompt\(region\)[\s\S]*书包里的小物件，都重新回到它们的位置了。[\s\S]*屏幕里的小游戏和留言，都看完了。[\s\S]*抽屉里的旧时光，暂时收拾好了。[\s\S]*耳机里的夏天，又听完了一小段。[\s\S]*纸箱里的旧物，都重新见过一面了。[\s\S]*return `\$\{completionCopy\}\\n\$\{nextCopy\}`;/);
  assert.match(script, /completedStoryPrompt\("bag"\)/);
  assert.match(script, /completedStoryPrompt\("computer"\)/);
  assert.match(script, /completedStoryPrompt\("drawer"\)/);
  assert.match(script, /completedStoryPrompt\("mp3"\)/);
  assert.match(script, /completedStoryPrompt\("box"\)/);
});

test("reopening bag, drawer, or box restores its module story copy", () => {
  assert.match(script, /region === "bag" \|\| region === "drawer"/);
  assert.match(script, /thought\.textContent = regionCopy\.box;/);
});

test("box stays locked until the four prerequisite regions are complete and contains five items", () => {
  assert.equal((html.match(/data-box-item=/g) ?? []).length, 5);
  assert.match(html, /data-box-item="class-photo"/);
  assert.match(script, /boxPrerequisitesComplete/);
  assert.match(script, /纸箱还没完全收好/);
});

test("box unlocks after the four main modules have been opened", () => {
  assert.match(script, /function boxPrerequisitesComplete\(\) \{[\s\S]*regionStates\.bag === "open"[\s\S]*regionStates\.computer === "open"[\s\S]*regionStates\.drawer === "open"[\s\S]*regionStates\.mp3Started/);
});

test("box hotspot always opens its preview instead of returning before showing the dialog", () => {
  assert.doesNotMatch(script, /if \(region === "box"\) \{\n    if \(!boxPrerequisitesComplete\(\)\)/);
  assert.match(script, /if \(region === "box"\) \{[\s\S]*focusCard\.hidden = false;/);
});

test("box hotspot uses the shared region handler without inline state changes", () => {
  assert.match(html, /data-region="box"/);
  assert.doesNotMatch(html, /data-region="box"[^>]*onclick=/);
});

test("class photo opens on the front first and flips with an overlaid back inscription", () => {
  assert.match(html, /data-box-photo-flip/);
  assert.match(html, /data-box-photo-back-text/);
  assert.match(script, /boxPhotoSide = "front"/);
  assert.match(script, /boxPhotoFlip\.addEventListener\("click"/);
});

test("box photo inscription stays within the photo and box preview is reduced", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.box-photo-stage \[data-box-photo-back-text\] \{[^}]*width: min\(68%, 230px\);[^}]*max-width: 230px;/s);
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.module-preview \{ height: 180px;/s);
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.module-preview img \{[^}]*width: 66%;[^}]*height: 72%;[^}]*transform: translateY\(-16px\);/s);
});

test("box uses the folded school uniform asset", () => {
  assert.match(html, /纸箱_实验中学校服_折叠_桌面\.png/);
  assert.doesNotMatch(html, /data-box-item="uniform"[^>]*>[\s\S]*实验中学校服_展开_桌面\.png/);
});

test("back inscription renders above the back photo", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.box-photo-stage \[data-box-photo-back-text\] \{[^}]*z-index: 2;[^}]*pointer-events: none;/s);
});

test("back inscription wraps inside the photo", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.box-photo-stage \[data-box-photo-back-text\] \{[^}]*width: min\(68%, 230px\);[^}]*font: 600 \.78rem\/1\.4 var\(--font-hand\);[^}]*white-space: normal;[^}]*word-break: break-all;/s);
  assert.match(html, /不要忘记我，我们是永远的<br>好朋友。/);
});

test("drawer clue keeps its intentional line break", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-thought \{[^}]*white-space: pre-line;/s);
  assert.match(script, /抽屉里露出的那一角，原来是这张合照。\\n诶，照片背后好像有字。/);
});

test("password prompt specifies a four-digit date", () => {
  assert.match(readFileSync(new URL("room.html", import.meta.url), "utf8"), /输入纸条上那一天的日期（4位数字）/);
});

test("drawer reopening preserves the opened drawer scene", () => {
  assert.match(script, /roomScene\.classList\.toggle\("is-drawer-open", region === "drawer" && regionStates\.drawer === "open"\)/);
  assert.match(script, /regionStates\.drawer = "open";/);
});

test("drawer photo stage uses an ellipsis guide", () => {
  assert.match(script, /抽屉底下露出了一张照片，点击合照看看\.\.\./);
  assert.match(readFileSync(new URL("room.html", import.meta.url), "utf8"), /aria-label="点击查看露出一角的旧合照"/);
});

test("drawer uses return while unfinished, continues to the next item, and closes when complete", () => {
  assert.match(script, /else if \(region === "drawer" && regionStates\.drawer === "open"\)[\s\S]*focusClose\.textContent = "返回房间"/);
  assert.match(script, /function openNextDrawerItem\(\)[\s\S]*nextItem\?\.click\(\)/);
  assert.match(script, /region === "drawer" && regionStates\.drawerPhotoSeen[\s\S]*focusComplete\.textContent = "关闭抽屉"/);
});

test("drawer recheck appears only from the completed preview state", () => {
  assert.match(script, /shell\.dataset\.focusRegion === "drawer" && regionStates\.drawerPhotoSeen && focusClose\.textContent === "再检查一遍"/);
  assert.match(script, /else if \(region === "drawer" && regionStates\.drawer === "open"\)[\s\S]*focusClose\.textContent = "返回房间"/);
});

test("completed drawer preview and recheck use the confirmed button flow", () => {
  assert.match(script, /if \(region === "drawer" && regionStates\.drawerPhotoSeen\) \{[\s\S]*focusComplete\.textContent = "关闭抽屉"[\s\S]*focusClose\.textContent = "再检查一遍"/);
  assert.match(script, /shell\.dataset\.focusRegion === "drawer" && regionStates\.drawerPhotoSeen && focusClose\.textContent === "再检查一遍"[\s\S]*focusComplete\.textContent = "关闭抽屉"[\s\S]*focusClose\.hidden = true/);
});

test("completed drawer preview keeps the background drawer open", () => {
  assert.match(script, /if \(region === "drawer" && regionStates\.drawerPhotoSeen\)[\s\S]*regionStates\.drawer = "open"[\s\S]*roomScene\.classList\.add\("is-drawer-open"\)/);
});

test("completed drawer preview restores the open drawer scene before either action", () => {
  assert.match(script, /if \(region === "drawer" && regionStates\.drawer === "closed" && regionStates\.drawerPhotoSeen\) \{[\s\S]*regionStates\.drawer = "open"[\s\S]*roomScene\.classList\.add\("is-drawer-open"\)/);
});

test("drawer preview opens first, completion closes the background drawer, and reopening requires opening again", () => {
  assert.match(script, /regionStates\.drawer === "closed"\n      \? "打开抽屉"/);
  assert.match(script, /if \(regionStates\.drawerPhotoSeen\) \{[\s\S]*regionStates\.drawer = "closed"[\s\S]*roomScene\.classList\.remove\("is-drawer-open"\)/);
});

test("box photo is enlarged so the back inscription fits within it", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.box-photo-detail img \{[^}]*width: min\(100%, 380px\);[^}]*max-height: 170px;/s);
  assert.match(css, /\.box-photo-stage \[data-box-photo-back-text\] \{[^}]*max-width: 230px;/s);
});

test("box dialog reserves space for the bottom story strip", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.room-focus-card \{[^}]*top: 45%;[^}]*padding: 18px 20px;[^}]*overflow: visible;/s);
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.box-item img \{[^}]*height: 42px;/s);
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.box-photo-detail img \{[^}]*max-height: 170px;/s);
});

test("box story strip stays visible beneath the dialog", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.room-thought \{[^}]*bottom: 1%;[^}]*z-index: 7;/s);
});

test("box dialog keeps balanced top and bottom whitespace without scrolling", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.room-focus-card \{[^}]*top: 45%;[^}]*overflow: visible;/s);
  assert.match(css, /\.room-shell\[data-focus-region="box"\] \.box-photo-detail img \{[^}]*max-height: 170px;/s);
});

test("bag dialog keeps its lower text visible without scrolling", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="bag"\] \.room-focus-card \{[^}]*top: 44%;[^}]*max-height: none;[^}]*overflow: visible;[^}]*scale\(\.94\);/s);
  assert.doesNotMatch(css, /\.room-shell\[data-focus-region="bag"\] \.room-focus-card \{[^}]*overflow-y: auto;/s);
});

test("bag preview frame enlarges the complete closed backpack", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="bag"\] \.module-preview \{ height: 250px;/s);
  assert.match(css, /\.room-shell\[data-focus-region="bag"\] \.module-preview img \{[^}]*width: 88%;[^}]*height: 92%;[^}]*object-position: center;/s);
});

test("computer initially opens only one preview dialog", () => {
  assert.match(html, /data-computer-hotspot/);
  assert.match(html, /data-computer-preview-card[^>]*role="dialog"/);
  assert.match(html, /data-computer-preview-close/);
  assert.match(script, /const COMPUTER_MODULE_DISABLED = true/);
  assert.match(script, /function openComputerPreview\(\)[\s\S]*computerPreviewCard\.hidden = false;/);
  assert.match(html, /data-computer-preview-open/);
});

test("computer preview opens the computer module", () => {
  assert.match(script, /function openComputerModule\(\)[\s\S]*shell\.dataset\.focusRegion = "computer";[\s\S]*regionStates\.computer = "open"[\s\S]*computerPreviewCard\.hidden = true;[\s\S]*modulePreview\.hidden = true;[\s\S]*computerModule\.hidden = false;[\s\S]*focusCard\.hidden = false;/);
  assert.match(script, /computerPreviewOpen\?\.addEventListener\("click", openComputerModule\)/);
});

test("full computer games do not repeat the computer preview image", () => {
  const openComputerBody = script.match(/function openComputerModule\(\) \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(openComputerBody, /modulePreview\.hidden = true;/);
  assert.doesNotMatch(openComputerBody, /modulePreview\.hidden = false;/);
});

test("computer module close button uses the shared dialog close handler", () => {
  assert.match(script, /focusClose\?\.addEventListener\("click", \(event\) => \{[\s\S]*event\.preventDefault\(\);[\s\S]*closeRegion\(\);/);
  assert.doesNotMatch(script, /shell\.dataset\.focusRegion !== "computer"/);
  assert.match(script, /function closeComputerPreview\(event\)[\s\S]*computerPreviewCard\.hidden = true;[\s\S]*computerModule\.hidden = true;[\s\S]*moduleImage\.removeAttribute\("src"\);[\s\S]*setRoomDimmed\(false\);[\s\S]*roomScene\.classList\.remove\("is-drawer-open"\);/);
  const closeComputerBody = script.match(/function closeComputerPreview\(event\) \{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.doesNotMatch(closeComputerBody, /closeRegion\(\);/);
});

test("closing the computer preview restores the room without a second popup", () => {
  assert.match(script, /computerPreviewClose\?\.addEventListener\("click", closeComputerPreview\)/);
  assert.match(script, /roomDim\.style\.setProperty\("display", "none", "important"\);/);
  assert.match(script, /computerPreviewCard\.hidden = true;/);
  assert.match(script, /shell\.removeAttribute\("data-focus-region"\);/);
  assert.match(script, /setRoomDimmed\(false\);/);
  assert.match(script, /setRoomDimmed\(false\);/);
  assert.match(script, /focusCard\.style\.display = "none"/);
  assert.match(script, /function closeComputerPreview\(event\)[\s\S]*closeRegion\(\);/);
  assert.match(script, /computerPreviewClose\?\.addEventListener\("click", closeComputerPreview\)/);
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region\] \.room-dim\.is-clear \{ opacity: 0 !important; pointer-events: none !important;/);
});

test("fruit matching cards keep a stable size when all four columns are visible", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.match-board \{[^}]*grid-template-columns: repeat\(4, minmax\(76px, 1fr\)\)/s);
  assert.match(css, /\.match-card \{[^}]*height: 56px;/s);
  assert.match(css, /\.match-board \{[^}]*overflow: visible;/s);
});

test("fruit matching board keeps the source order for testing", () => {
  assert.match(script, /const cards = fruitAssets\.flatMap\(\(\[id, label, file\]\) => \[[\s\S]*?\{ id, label, file \},[\s\S]*?\{ id, label, file \},[\s\S]*?\]\);[\s\S]*const arranged = cards;/);
  assert.doesNotMatch(script, /Math\.random\(\)/);
});

test("fruit matching locks the board until a mismatched pair is covered again", () => {
  assert.match(script, /matchLocked: false/);
  assert.match(script, /if \([^\n]*regionStates\.matchLocked[^\n]*\) return;/);
  assert.match(script, /regionStates\.matchLocked = true;[\s\S]*window\.setTimeout\(\(\) => \{[\s\S]*regionStates\.matchLocked = false;/);
});

test("matched fruit cards become disabled and the hint does not complete a pair", () => {
  assert.match(script, /first\.disabled = true;[\s\S]*card\.disabled = true;/);
  const hintBody = script.match(/matchHint\.addEventListener\("click", \(\) => \{([\s\S]*?)\n\}\);/)?.[1] ?? "";
  assert.doesNotMatch(hintBody, /matchPairs \+= 1/);
  assert.match(script, /const MATCH_COMPLETE_GUIDE = "恭喜你！水果都找到自己的伙伴了。";/);
  assert.match(script, /regionStates\.matchPairs === fruitAssets\.length[\s\S]*finishComputerGames\("match"\)/);
});

test("computer hotspot covers the visible computer object", () => {
  assert.match(readFileSync(new URL("styles/room.css", import.meta.url), "utf8"), /\.room-hotspot--computer \{ left: 16\.198%; top: 34\.815%; width: 17\.031%; height: 30\.278%; \}/);
});

test("computer scene hotspot uses the shared region click handler", () => {
  assert.match(readFileSync(new URL("room.html", import.meta.url), "utf8"), /room-hotspot--computer[^>]*data-region="computer"/);
  assert.doesNotMatch(script, /computerHotspot\?\.addEventListener\("click", openComputerEntry\)/);
});

test("completed computer hotspot opens the completion preview directly", () => {
  assert.match(script, /if \(region === "computer" && COMPUTER_MODULE_DISABLED\) \{[\s\S]*if \(regionStates\.computer === "complete"\) \{[\s\S]*openComputerModule\(\);[\s\S]*showComputerCompleteCard\(\);[\s\S]*return;/);
});

test("computer room object exists for closeRegion to restore safely", () => {
  assert.match(html, /class="room-object room-object--computer"[^>]*data-object="computer"/);
});

test("room computer turns on only while the full computer module is open", () => {
  assert.match(script, /function openComputerModule\(\)[\s\S]*computerObject\.src = "素材\/图片【移除背景】\/电脑_旧电脑_开机_桌面\.png"/);
  assert.match(script, /function closeComputerPreview\(event\)[\s\S]*computerObject\.src = "素材\/图片【移除背景】\/电脑_旧电脑_关闭_桌面\.png"/);
  assert.match(script, /if \(closingRegion === "computer"\)[\s\S]*computerObject\.src = "素材\/图片【移除背景】\/电脑_旧电脑_关闭_桌面\.png"/);
});

test("room scene keeps the framed layout with an outer border", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-scene \{[^}]*margin: 24px auto;[^}]*border: 1px solid/s);
  assert.match(css, /\.room-scene \{[^}]*border-radius: 18px;/s);
});

test("computer module uses a more compact dialog without changing card size", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \{[^}]*width: min\(360px,/s);
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \.module-preview \{ height: 90px;/s);
});

test("computer module is fully removed from interaction during reset", () => {
  assert.match(html, /data-computer-preview-card/);
  assert.match(html, /data-computer-preview-close/);
});

test("computer module reset leaves no preview-card event handlers", () => {
  assert.match(html, /data-computer-preview-card/);
  assert.match(html, /data-computer-preview-close/);
  assert.match(script, /function openComputerPreview\(\)[\s\S]*computerPreviewCard\.hidden = false;/);
  assert.match(script, /computerPreviewClose\?\.addEventListener\("click", closeComputerPreview\)/);
});

test("closing any computer popup explicitly restores the undimmed room", () => {
  assert.match(script, /shell\.removeAttribute\("data-focus-region"\);/);
  assert.match(script, /setRoomDimmed\(false\);/);
  assert.match(script, /setRoomDimmed\(false\);/);
});

test("all module dialogs show the dim layer and closing restores it", () => {
  assert.match(script, /function setRoomDimmed\(isDimmed\)/);
  assert.match(script, /if \(region === "height"\)[\s\S]*return;[\s\S]*setRoomDimmed\(true\);/);
  assert.match(script, /setRoomDimmed\(true\);/);
  assert.match(script, /setRoomDimmed\(false\);/);
});

test("computer preview fits a smaller dialog while keeping the full computer visible", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \{[^}]*width: min\(360px,/s);
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \.module-preview \{ height: 90px;/s);
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \.module-preview img \{ width: 38%;/s);
});

test("computer preview card centers the complete computer image", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.computer-preview-card__image \{ height: 160px;[^}]*place-items: center;/s);
  assert.match(css, /\.computer-preview-card__image img \{ width: 58%; height: 78%; object-fit: contain; transform: translate\(-16px, -54px\);/s);
});

test("computer dialog is optically centered and its preview sits slightly higher", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \{[^}]*left: 50%;/s);
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \.module-preview img \{[^}]*transform: translateY\(-14px\);/s);
});

test("computer dialog content is centered within a width that fits the fixed board", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \{[^}]*width: min\(360px,/s);
  assert.match(css, /\.match-board \{[^}]*justify-content: center;/s);
});

test("return-to-room control explicitly closes the focus dialog", () => {
  assert.match(script, /focusClose\?\.addEventListener\("click", \(event\) => \{[\s\S]*event\.preventDefault\(\);[\s\S]*event\.stopPropagation\(\);[\s\S]*closeRegion\(\);/);
});

test("story strip never intercepts dialog buttons", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-thought \{[^}]*pointer-events: none;/s);
});

test("return-to-room has one shared event path without inline or delegated fallbacks", () => {
  assert.equal((script.match(/focusClose\?\.addEventListener\("click"/g) ?? []).length, 1);
  assert.doesNotMatch(script, /focusCard\.addEventListener\("click"/);
  assert.doesNotMatch(script, /document\.addEventListener\("click"/);
  assert.doesNotMatch(html, /data-focus-close[^>]*onclick=/);
  assert.doesNotMatch(script, /window\.closeRoomPopup/);
});

test("closing the focus card forces it out of layout until the next open", () => {
  assert.match(script, /focusCard\.style\.display = "none"/);
  assert.match(script, /focusCard\.style\.display = ""/);
});

test("computer, drawer, and box use a preview step before showing their contents", () => {
  assert.match(script, /regionStates = \{[^}]*drawer: "closed"/);
  assert.match(script, /regionStates = \{[^}]*box: "closed"/);
  assert.match(script, /regionStates\.computer === "closed" \? "打开电脑"/);
  assert.match(script, /regionStates\.drawer === "closed"\n?\s*\? "打开抽屉"/);
  assert.match(script, /regionStates\.box === "closed" \? "打开纸箱"/);
  assert.match(script, /if \(region === "drawer" && regionStates\.drawer === "closed"\)/);
  assert.match(script, /if \(region === "box" && regionStates\.box === "closed"\)/);
});

test("bag shows a closed preview before opening its contents", () => {
  assert.match(script, /if \(region === "bag" && regionStates\.bag === "closed"\) \{[\s\S]*moduleImage\.src = "素材\/图片【移除背景】\/书包_旧书包_关闭_桌面\.png";[\s\S]*modulePreview\.hidden = false;/);
  assert.match(script, /if \(region === "bag" && regionStates\.bag === "closed"\) \{[\s\S]*regionStates\.bag = "open";[\s\S]*bagObject\.src = "素材\/图片【移除背景】\/书包_旧书包_打开_桌面\.png";[\s\S]*modulePreview\.hidden = true;/);
  assert.match(script, /if \(shell\.dataset\.focusRegion === "bag" && regionStates\.bag === "closed"\) \{/);
});

test("packing the completed bag restores its finished room appearance", () => {
  assert.match(script, /if \(region === "bag"\) \{[\s\S]*bagObject\.src = "素材\/图片【移除背景】\/书包_旧书包_完成_桌面\.png";[\s\S]*bagObject\.alt = "收好的书包";/);
});

test("completed bag replaces return with a single pack-away action", () => {
  assert.match(script, /function updateBagProgress\(\) \{[\s\S]*focusClose\.hidden = !remaining;/);
  assert.match(script, /if \(region === "bag" && regionStates\.bag === "open" && \[\.\.\.bagItems\]\.every\(\(item\) => item\.classList\.contains\("is-picked"\)\)\) \{[\s\S]*regionStates\.bag = "complete";[\s\S]*closeRegion\(\);/);
});

test("finished bag offers a disabled status and a recheck action", () => {
  assert.match(script, /regionStates\.bag = "complete";[\s\S]*focusComplete\.textContent = "已收好";[\s\S]*focusComplete\.disabled = false;[\s\S]*focusClose\.textContent = "再检查一遍";/);
  assert.match(script, /if \(shell\.dataset\.focusRegion === "bag" && regionStates\.bag === "complete"\) \{[\s\S]*bagItemsPanel\.hidden = false;[\s\S]*focusClose\.textContent = "返回房间";/);
});

test("bag continue stays visible and opens the next unviewed item in order", () => {
  assert.match(script, /function openNextBagItem\(\) \{[\s\S]*find\(\(item\) => !item\.classList\.contains\("is-picked"\)\)[\s\S]*nextItem\?\.click\(\);/);
  assert.match(script, /function updateBagProgress\(\) \{[\s\S]*focusComplete\.hidden = false;[\s\S]*focusComplete\.textContent = remaining \? "继续查看" : "收好书包";/);
  assert.match(script, /if \(region === "bag" && \[\.\.\.bagItems\]\.some[\s\S]*openNextBagItem\(\);/);
});

test("finished bag uses its completed story copy", () => {
  assert.match(script, /regionStates\.bag === "complete"[\s\S]*拉链拉好了，重要的东西也都好好收着。/);
  assert.match(script, /regionStates\.bag === "complete"[\s\S]*书包已经整理好啦，看看房间还有什么没收拾。/);
});

test("computer keeps its screen lit until the completed module is closed", () => {
  assert.match(script, /if \(closingRegion === "computer"\) \{[\s\S]*computerObject\.src = computerIsComplete\(\)[\s\S]*电脑_旧电脑_关闭_桌面\.png[\s\S]*电脑_旧电脑_开机_桌面\.png/);
  assert.match(script, /if \(computerIsComplete\(\)\) \{[\s\S]*focusComplete\.textContent = "关闭电脑";[\s\S]*focusClose\.hidden = true;/);
});

test("reopening an already opened computer skips the preview card", () => {
  assert.match(script, /if \(region === "computer" && COMPUTER_MODULE_DISABLED\) \{[\s\S]*if \(regionStates\.computer === "open"\) \{[\s\S]*openComputerModule\(\);[\s\S]*return;[\s\S]*openComputerPreview\(\);/);
});

test("completed matching uses a framed two-line memory note", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(script, /matchStatus\.classList\.add\("is-memory-note"\);/);
  assert.match(script, /再玩一局就去写作业。\\n你还记得，最后是谁帮你找到了那一对吗？/);
  assert.match(css, /\.computer-app-hint\.is-memory-note \{[^}]*border: 1px dashed/);
});

test("completed computer dialog fits its close action and guides the user to close", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(script, /focusCard\.classList\.toggle\("is-complete", computerIsComplete\(\)\);/);
  assert.match(script, /留言都看完啦，可以关闭电脑了。/);
  assert.match(css, /\.room-focus-card\.is-complete:has\(\.computer-module\) \{[^}]*padding: 12px;/s);
});

test("completed bag always reopens with completed actions and updated story copy", () => {
  assert.match(script, /regionStates\.bag === "complete"[\s\S]*focusComplete\.textContent = "已收好"[\s\S]*focusClose\.textContent = "再检查一遍";/);
  assert.match(script, /regionStates\.bag === "complete"[\s\S]*书包已经整理好啦，看看房间还有什么没收拾。/);
});

test("completed bag keeps only the renamed pack-away action", () => {
  assert.match(script, /region === "bag" && regionStates\.bag === "complete"[\s\S]*focusComplete\.textContent = "收好书包"/);
  assert.match(script, /if \(region === "bag" && regionStates\.bag === "complete"\)[\s\S]*focusComplete\.textContent = "收好书包"/);
});

test("completed bag preview offers recheck, then keeps only pack-away", () => {
  assert.match(script, /if \(region === "bag" && regionStates\.bag === "complete"\) \{[\s\S]*focusComplete\.textContent = "收好书包"[\s\S]*focusClose\.hidden = false[\s\S]*focusClose\.textContent = "再检查一遍"/);
  assert.match(script, /shell\.dataset\.focusRegion === "bag" && regionStates\.bag === "complete"[\s\S]*bagItemsPanel\.hidden = false[\s\S]*focusComplete\.textContent = "收好书包"[\s\S]*focusClose\.hidden = true/);
});

test("completed matching removes the hint control", () => {
  assert.match(script, /regionStates\.matchPairs === fruitAssets\.length[\s\S]*matchHint\.hidden = true;/);
});

test("reopened completed computer uses the next-room story copy", () => {
  assert.match(script, /closingRegion === "computer" && computerIsComplete\(\)[\s\S]*留言都看完啦，看看房间还有什么没收拾。/);
});

test("completed computer shows a completion card with close and recheck actions", () => {
  assert.match(script, /function showComputerCompleteCard\(\)[\s\S]*focusComplete\.textContent = "关闭电脑"[\s\S]*focusClose\.textContent = "再检查一遍"/);
  assert.match(script, /if \(regionStates\.computer === "complete"\) \{[\s\S]*showComputerCompleteCard\(\);/);
  assert.match(script, /regionStates\.computer === "complete" && focusClose\.textContent === "再检查一遍"[\s\S]*computerModule\.hidden = false/);
});

test("computer scene hotspot also skips preview after first opening", () => {
  assert.match(script, /function openComputerEntry\(\) \{[\s\S]*regionStates\.computer === "open"[\s\S]*openComputerModule\(\);[\s\S]*openComputerPreview\(\);/);
  assert.match(script, /computerHotspot\?\.addEventListener\("click", openComputerEntry\)/);
});

test("box preview stays unlocked until opening changes the room box", () => {
  assert.match(html, /data-object="box"/);
  assert.match(script, /if \(region === "box"\) \{[\s\S]*moduleImage\.src = regionStates\.box === "open"[\s\S]*纸箱_搬家纸箱_打开_桌面\.png[\s\S]*纸箱_搬家纸箱_解锁_桌面\.png/);
  assert.match(script, /if \(region === "box" && regionStates\.box === "closed"\) \{[\s\S]*boxObject\.src = "素材\/图片【移除背景】\/纸箱_搬家纸箱_打开_桌面\.png";/);
});

test("computer preview is hidden after entering the full computer module", () => {
  assert.match(script, /if \(regionStates\.computer === "closed"\) \{[\s\S]*modulePreview\.hidden = false[\s\S]*return;/);
  assert.match(script, /if \(region === "computer"\) \{[\s\S]*computerModule\.hidden = false;[\s\S]*modulePreview\.hidden = true;/);
  assert.doesNotMatch(script, /computerModule\.hidden = false;\n    modulePreview\.hidden = false;/);
});

test("computer preview image is raised and centered in the opening dialog", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-focus-card:has\(\.computer-module\) \.module-preview img \{[^}]*object-position: center 42%;[^}]*transform: translateY\(-14px\);/s);
});

test("MP3 preview image is reduced to show the complete player", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="mp3"\] \.module-preview \{ height: 240px;/s);
  assert.match(css, /\.room-shell\[data-focus-region="mp3"\] \.module-preview img \{[^}]*width: 82%;[^}]*height: 100%;/s);
});

test("farm uses six fixed interactive plots on the 6x4 field", () => {
  assert.match(html, /电脑_QQ农场_土地底图_6列4行_桌面\.png/);
  assert.match(html, /data-farm-grid/);
  assert.equal((html.match(/data-farm-plot=/g) ?? []).length, 6);
  for (const coordinate of ["2-2", "4-5", "2-5", "4-2", "3-3", "3-4"]) {
    assert.match(html, new RegExp(`data-farm-coordinate="${coordinate}"`));
  }
});

test("farm plot controls use the supplied state and action assets", () => {
  for (const asset of [
    "作物_幼苗", "作物_浇水后", "作物_成熟", "杂草_默认",
    "水壶_默认", "水流_效果", "浇水_水花效果",
    "镰刀_默认", "镰刀_挥动残影", "除草_叶片效果",
    "成熟果子_默认", "果子_掉落轨迹", "收获_星光效果",
  ]) assert.match(`${html}\n${script}`, new RegExp(asset));
  assert.match(html, />浇水</);
  assert.match(html, />除草</);
  assert.match(html, />收获</);
});

test("farm completes after all six plot actions and reveals the message automatically", () => {
  assert.match(script, /farmCompletedPlots/);
  assert.match(script, /farmPlots\.length/);
  assert.match(script, /is-animating/);
  assert.match(script, /plot\.classList\.contains\("is-complete"\) \|\| plot\.classList\.contains\("is-animating"\)/);
  assert.match(script, /plot\.disabled = true;/);
  assert.match(script, /farmMessage\.hidden = false/);
  assert.match(script, /regionStates\.farmMessageSeen = true/);
  assert.match(script, /computerIsComplete\(\)/);
  assert.match(html, /你不在的时候，<br>我帮你浇过水了。<br>——你的好友圈圈/);
});

test("computer app tabs expose and update their selected state", () => {
  assert.match(html, /data-computer-app="match"[^>]*aria-selected="true"/);
  assert.match(html, /data-computer-app="farm"[^>]*aria-selected="false"/);
  assert.match(script, /entry\.setAttribute\("aria-selected", String\(entry === tab\)\)/);
  assert.match(script, /panel\.hidden = panel\.dataset\.computerPanel !== app/);
});

test("computer completion marks its progress item and preserves the completion story", () => {
  assert.match(html, /<button class="progress-item"[^>]*data-region="computer"/);
  assert.match(script, /if \(!computerIsComplete\(\)\)[\s\S]*return;[\s\S]*item\.dataset\.region === region[\s\S]*classList\.add\("is-done"\)/);
  assert.match(script, /thought\.textContent = completedStoryPrompt\("computer"\);[\s\S]*closeRegion\(\);/);
  assert.match(script, /if \(closingRegion === "computer" && computerIsComplete\(\)\)[\s\S]*thought\.textContent = completedStoryPrompt\("computer"\)/);
});

test("computer first game view uses the primary action to return to the room", () => {
  assert.match(script, /function openComputerModule\(\)[\s\S]*focusComplete\.hidden = false;[\s\S]*focusComplete\.textContent = computerIsComplete\(\) \? "关闭电脑" : "返回房间";[\s\S]*focusClose\.hidden = true;/);
  assert.match(script, /if \(region === "computer"\) \{[\s\S]*if \(!computerIsComplete\(\)\) \{[\s\S]*closeRegion\(\);[\s\S]*return;/);
  assert.match(script, /focusComplete\.hidden = false;[\s\S]*focusComplete\.textContent = "关闭电脑";/);
  assert.match(script, /function openRegion\(region\) \{[\s\S]*focusComplete\.hidden = false;/);
});

test("computer progress item opens the same preview as the room hotspot", () => {
  assert.match(script, /if \(region === "computer" && COMPUTER_MODULE_DISABLED\) \{[\s\S]*openComputerPreview\(\);[\s\S]*return;/);
});

test("computer dialog updates the story strip and leaves room around it", () => {
  assert.match(script, /function openComputerPreview\(\)[\s\S]*thought\.textContent =/);
  assert.match(script, /function openComputerModule\(\)[\s\S]*thought\.textContent =/);
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="computer"\] \.room-focus-card \{[^}]*top: 46%;[^}]*max-height: calc\(100% - 110px\);/s);
  assert.match(css, /\.room-shell\[data-focus-region="computer"\] \.room-thought \{[^}]*bottom: 2%;[^}]*z-index: 7;/s);
});

test("computer match completion uses the workbook message", () => {
  assert.match(script, /再玩一局就去写作业。\\n你还记得，最后是谁帮你找到了那一对吗？/);
});

test("computer opening uses the workbook waiting story copy", () => {
  assert.match(script, /电脑里的小游戏和留言，都还在等你发现。/);
  assert.doesNotMatch(script, /屏幕里的小游戏和留言，都还在等你发现。/);
});

test("main modules follow a fixed order with one pulsing next hotspot", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(script, /const MODULE_ORDER = \["bag", "computer", "drawer", "mp3", "box"\]/);
  assert.match(script, /function updateNextHotspot\(\)/);
  assert.match(script, /hotspot\.classList\.toggle\("is-next"/);
  assert.match(script, /function isModuleUnlocked\(region\)/);
  assert.match(script, /MODULE_ORDER\.includes\(region\) && !isModuleUnlocked\(region\)\) return;/);
  assert.match(css, /\.room-hotspot\.is-next[\s\S]*animation: hotspot-pulse/);
  assert.match(css, /\.room-hotspot\.is-next \{[^}]*background: rgb\(242 198 109 \/ 34%\);[^}]*box-shadow: 0 0 0 8px rgb\(242 198 109 \/ 26%\);/s);
  assert.doesNotMatch(css, /\.room-hotspot\.is-next::after/);
  assert.match(css, /\.room-hotspot\.is-next:hover, \.room-hotspot\.is-next:focus-visible \{[^}]*animation-play-state: paused/);
});

test("computer game progress and tab changes use the shared discovery guide", () => {
  assert.match(script, /const COMPUTER_DISCOVERY_GUIDE = "电脑里的小游戏和留言，都还在等你发现。";/);
  assert.match(script, /function updateComputerThoughtForApp\(app\)[\s\S]*: COMPUTER_DISCOVERY_GUIDE;/);
  assert.match(script, /document\.querySelectorAll\("\[data-computer-panel\]"\)[\s\S]*updateComputerThoughtForApp\(app\);/);
});

test("finishing matching updates the story strip before the farm is complete", () => {
  assert.match(script, /const MATCH_COMPLETE_GUIDE = "恭喜你！水果都找到自己的伙伴了。";/);
  assert.match(script, /finishComputerGames\("match"\)/);
});

test("the game completed last receives the shared close-computer prompt", () => {
  assert.match(script, /const FARM_COMPLETE_GUIDE = "农田都照料好了，原来有人在偷偷帮你。";/);
  assert.match(script, /function finishComputerGames\(lastGame\)[\s\S]*const completionPrompt = lastGame === "match" \? MATCH_COMPLETE_GUIDE : FARM_COMPLETE_GUIDE;[\s\S]*thought\.textContent = computerIsComplete\(\)[\s\S]*`\$\{completionPrompt\}\\n\$\{closePrompt\}`[\s\S]*: completionPrompt;/);
  assert.doesNotMatch(script, /matchStatus\.textContent \+= `\\n\\n\$\{closePrompt\}`/);
  assert.doesNotMatch(script, /farmMessage\.textContent \+= `\\n\\n\$\{closePrompt\}`/);
  assert.match(script, /finishComputerGames\("match"\)/);
  assert.match(script, /finishComputerGames\("farm"\)/);
});

test("computer story strip reserves balanced space for one or two guide lines", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-shell\[data-focus-region="computer"\] \.room-thought \{[^}]*width: min\(620px, calc\(100% - 40px\)\);[^}]*min-height: 56px;[^}]*box-sizing: border-box;/s);
});

test("computer completion keeps whitespace above the dialog and above the story strip", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(script, /if \(!computerIsComplete\(\)\) return;[\s\S]*focusCard\.classList\.add\("is-complete"\);/);
  assert.match(css, /\.room-shell\[data-focus-region="computer"\] \.room-focus-card\.is-complete \{[^}]*top: 43%;[^}]*transform: translate\(-50%, -50%\) scale\(\.94\);[^}]*transform-origin: center;/s);
});

test("reopened completed computer and bag keep their room guidance throughout", () => {
  assert.match(script, /function showComputerCompleteCard\(\)[\s\S]*thought\.textContent = "留言都看完啦，看看房间还有什么没收拾。";/);
  assert.match(script, /region === "bag" && regionStates\.bag === "complete"[\s\S]*thought\.textContent = region === "bag" && regionStates\.bag === "complete"\n        \? "书包已经整理好啦，看看房间还有什么没收拾。"/);
});

test("bag item details mark items, use changed previews, and restore the list", () => {
  assert.match(script, /bagItemsPanel\.hidden = true;[\s\S]*boxDetailDialog\.hidden = false/);
  assert.match(script, /书包_红领巾_展开_桌面\.png/);
  assert.match(script, /书包_校牌_正面_桌面\.png/);
  assert.match(script, /item\.classList\.add\("is-picked"\)/);
  assert.match(script, /boxDialogClose\.textContent = "返回书包"/);
});

test("bag password success opens the password book detail", () => {
  assert.match(script, /passwordInput\.value\.trim\(\) === "1025"/);
  assert.match(script, /书包_密码本_打开_桌面\.png/);
  assert.match(script, /boxDialogTitle\.textContent = "密码本"/);
});

test("computer first close and later closes use different workbook story copy", () => {
  assert.match(script, /const wasPreviouslyClosed = regionStates\.computerClosedOnce;/);
  assert.match(script, /wasPreviouslyClosed[\s\S]*留言都看完啦，看看房间还有什么没收拾。[\s\S]*电脑里的小游戏和留言，都看完啦。\\n桌子下面的抽屉，也该打开看看了。/);
});

test("completed computer reopens with the workbook completion card", () => {
  assert.match(script, /function showComputerCompleteCard\(\)[\s\S]*屏幕暗下来了，重要的留言也都好好留在记忆里。/);
  assert.match(script, /focusComplete\.textContent = "关闭电脑";[\s\S]*focusClose\.textContent = "再检查一遍";/);
});

test("completed computer preview hides its image and uses the finished guidance", () => {
  assert.match(script, /function showComputerCompleteCard\(\)[\s\S]*modulePreview\.hidden = true[\s\S]*moduleImage\.removeAttribute\("src"\)[\s\S]*屏幕暗下来了，重要的留言也都好好留在记忆里。/);
  assert.match(script, /showComputerCompleteCard\(\)[\s\S]*thought\.textContent = "留言都看完啦，看看房间还有什么没收拾。"/);
});

test("rechecking completed computer keeps only the close-computer action", () => {
  assert.match(script, /region === "computer" && regionStates\.computer === "complete" && focusClose\.textContent === "再检查一遍"[\s\S]*focusComplete\.textContent = "关闭电脑"[\s\S]*focusClose\.hidden = true/);
});

test("completed drawer preview uses its finished copy without a photo preview", () => {
  assert.match(script, /regionStates\.drawer === "closed" && regionStates\.drawerPhotoSeen[\s\S]*modulePreview\.hidden = true[\s\S]*moduleImage\.removeAttribute\("src"\)/);
  assert.match(script, /抽屉合上了，重要的回忆也都好好存着。/);
  assert.match(script, /抽屉也整理好啦，看看房间还有什么没收拾。/);
});

test("drawer recheck dialog leaves a gap above the story strip", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(script, /focusCard\.classList\.add\("is-drawer-recheck"\)/);
  assert.match(css, /\.room-shell\[data-focus-region="drawer"\] \.room-focus-card\.is-drawer-recheck \{[^}]*top: 42%;/);
});

test("drawer preview resets unfinished secondary action and item clicks stay in the detail view", () => {
  assert.match(script, /region === "drawer" && regionStates\.drawer === "closed" && !regionStates\.drawerPhotoSeen[\s\S]*focusClose\.textContent = "返回房间"/);
  assert.match(script, /drawerItems\.forEach\(\(item\) => \{[\s\S]*event\.stopPropagation\(\)[\s\S]*focusCopy\.textContent/);
});

test("completed drawer entry takes the completion preview path before the default preview", () => {
  assert.match(script, /if \(region === "drawer" && regionStates\.drawerPhotoSeen\) \{[\s\S]*focusCard\.style\.display = ""[\s\S]*focusCopy\.textContent = "抽屉合上了，重要的回忆也都好好存着。"[\s\S]*focusComplete\.textContent = "关闭抽屉"[\s\S]*focusClose\.textContent = "再检查一遍"/);
});

test("farm crop sprites are enlarged and centered independently", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.farm-plot-state \{[^}]*left: 50%;[^}]*top: 42%;[^}]*width: 236%;[^}]*transform: translate\(-50%, -50%\)/s);
  assert.match(css, /data-farm-plot="weed"/);
  assert.match(css, /data-farm-plot="harvest"/);
});

test("active farm panel fits its message and actions inside the computer dialog", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.room-focus-card:has\(\[data-computer-panel="farm"\]:not\(\[hidden\]\)\) \.farm-field \{[^}]*width: min\(100%, 270px\);[^}]*margin: 4px auto -38px;/s);
  assert.match(css, /\.room-focus-card:has\(\[data-computer-panel="farm"\]:not\(\[hidden\]\)\) \.farm-message \{[^}]*margin: 4px 0 0;[^}]*padding: 6px 8px;/s);
  assert.match(css, /\.room-focus-card:has\(\[data-computer-panel="farm"\]:not\(\[hidden\]\)\) \.focus-actions \{[^}]*margin-top: 6px;/s);
  assert.doesNotMatch(css, /\.room-focus-card:has\(\[data-computer-panel="farm"\]:not\(\[hidden\]\)\) \.focus-actions \{[^}]*translateY/s);
  assert.match(css, /\.room-focus-card:has\(\[data-computer-panel="farm"\]:not\(\[hidden\]\)\) \.computer-module \{[^}]*margin-bottom: 0;/s);
});

test("watering can uses a separate raised animation from the water effects", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.farm-plot\.is-watering \.farm-tool \{ animation: farm-watering-can/);
  assert.match(css, /@keyframes farm-watering-can/);
  assert.match(css, /translateY\(-45%\)/);
});

test("weeding and harvest tools use separate raised animations", () => {
  const css = readFileSync(new URL("styles/room.css", import.meta.url), "utf8");
  assert.match(css, /\.farm-plot\.is-weeding \.farm-tool \{ animation: farm-weeding-sickle/);
  assert.match(css, /\.farm-plot\.is-harvesting \.farm-tool \{ animation: farm-harvest-fruit/);
  assert.match(css, /@keyframes farm-weeding-sickle/);
  assert.match(css, /@keyframes farm-harvest-fruit/);
});

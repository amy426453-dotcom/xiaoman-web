const regionNames = {
  bag: "书包",
  computer: "电脑",
  drawer: "书桌抽屉",
  mp3: "MP3",
  box: "纸箱",
  height: "身高刻度",
};

const regionCopy = {
  bag: "快打开书包看看里面藏着哪些回忆！",
  computer: "屏幕还亮着，也许还有一条留言没有看。",
  drawer: "快打开抽屉看看里面藏着哪些回忆！",
  mp3: "快打开MP3听听是哪首歌曲！",
  box: "纸箱安静地放在角落，像是在等一个合适的告别时刻。",
  height: "156cm——这是小满最近一次的身高。",
};

const shell = document.querySelector(".room-shell");
const roomScene = document.querySelector(".room-scene");
const roomDim = document.querySelector(".room-dim");
const focusCard = document.querySelector(".room-focus-card");
const computerPreviewCard = document.querySelector("[data-computer-preview-card]");
const computerHotspot = document.querySelector("[data-computer-hotspot]");
const computerPreviewClose = document.querySelector("[data-computer-preview-close]");
const computerPreviewOpen = document.querySelector("[data-computer-preview-open]");
const focusTitle = document.querySelector("#focus-title");
const focusCopy = document.querySelector("[data-focus-copy]");
const focusClose = document.querySelector("[data-focus-close]");
const focusComplete = document.querySelector("[data-focus-complete]");
const modulePreview = document.querySelector("[data-module-preview]");
const moduleImage = document.querySelector("[data-module-image]");
const thought = document.querySelector("[data-thought]");
const endingReopen = document.querySelector("[data-ending-reopen]");
const progressItems = document.querySelectorAll(".progress-item");
const hotspots = document.querySelectorAll(".room-hotspot");
const heightHotspot = document.querySelector('[data-region="height"]');
const bagObject = document.querySelector('[data-object="bag"]');
const computerObject = document.querySelector('[data-object="computer"]');
const bagItemsPanel = document.querySelector("[data-bag-items]");
const bagItems = document.querySelectorAll("[data-bag-item]");
const noteDetail = document.querySelector("[data-note-detail]");
const passwordDetail = document.querySelector("[data-password-detail]");
const passwordInput = document.querySelector("#password-input");
const passwordFeedback = document.querySelector("[data-password-feedback]");
const drawerItemsPanel = document.querySelector("[data-drawer-items]");
const drawerItems = document.querySelectorAll("[data-drawer-item]");
const drawerPhoto = document.querySelector("[data-drawer-photo]");
const boxItemsPanel = document.querySelector("[data-box-items]");
const boxItems = document.querySelectorAll("[data-box-item]");
const boxPhotoDetail = document.querySelector("[data-box-photo-detail]");
const boxPhotoImage = document.querySelector("[data-box-photo-image]");
const boxPhotoFlip = document.querySelector("[data-box-photo-flip]");
const boxPhotoClose = document.querySelector("[data-box-photo-close]");
const boxPhotoThought = document.querySelector("[data-box-photo-thought]");
const boxPhotoCaption = document.querySelector("[data-box-photo-caption]");
const boxPhotoBackText = document.querySelector("[data-box-photo-back-text]");
const boxItemDetail = document.querySelector("[data-box-item-detail]");
const boxItemDetailImage = document.querySelector("[data-box-item-detail-image]");
const boxItemDetailTitle = document.querySelector("[data-box-item-detail-title]");
const boxItemDetailCopy = document.querySelector("[data-box-item-detail-copy]");
const boxItemDetailThought = document.querySelector("[data-box-item-detail-thought]");
const boxDetailDialog = document.querySelector("[data-box-detail-dialog]");
const boxDialogImage = document.querySelector("[data-box-dialog-image]");
const boxDialogTitle = document.querySelector("[data-box-dialog-title]");
const boxDialogCopy = document.querySelector("[data-box-dialog-copy]");
const boxDialogThought = document.querySelector("[data-box-dialog-thought]");
const boxDialogClose = document.querySelector("[data-box-dialog-close]");
const boxObject = document.querySelector('[data-object="box"]');
const computerModule = document.querySelector("[data-computer-module]");
const matchBoard = document.querySelector("[data-match-board]");
const matchStatus = document.querySelector("[data-match-status]");
const matchMemoryNote = document.querySelector("[data-match-memory-note]");
const matchHint = document.querySelector("[data-match-hint]");
const farmStatus = document.querySelector("[data-farm-status]");
const farmMessage = document.querySelector("[data-farm-message-copy]");
const farmPlots = document.querySelectorAll("[data-farm-plot]");
const farmCompletedPlots = new Set();
const drawerSfx = {
  wrapper: new Audio("素材/音频/audio/sfx/candy-wrapper.mp3"),
  "fortune-teller": new Audio("素材/音频/audio/sfx/fold-paper.mp3"),
  bubblegum: new Audio("素材/音频/audio/sfx/bubble gum.mp3"),
  comic: new Audio("素材/音频/audio/sfx/爆笑校园.MP3"),
  "spinning-top": new Audio("素材/音频/audio/sfx/top-spin.mp3"),
  marbles: new Audio("素材/音频/audio/sfx/marble-roll.mp3"),
};
const drawerPullSfx = new Audio("素材/音频/audio/sfx/drawer-pull.mp3");
let activeDrawerSfx = null;
const boxSfx = {
  notice: new Audio("素材/音频/audio/sfx/paper-rustle.mp3"),
  key: new Audio("素材/音频/audio/sfx/key-jingle.mp3"),
  "new-bag": new Audio("素材/音频/audio/sfx/bag-zipper.mp3"),
  uniform: new Audio("素材/音频/audio/sfx/fabric-unfold.mp3"),
  "class-photo": new Audio("素材/音频/audio/sfx/photo-slide-out.mp3"),
};
const photoFlipSfx = new Audio("素材/音频/audio/sfx/photo-flip.mp3");
const boxOpenSfx = new Audio("素材/音频/audio/sfx/box-tape-tear2.MP3");
const boxCloseSfx = new Audio("素材/音频/audio/sfx/box-close.mp3");
const boxRecheckSfx = new Audio("素材/音频/audio/sfx/box-open.mp3");
let activeBoxSfx = null;
const bagSfx = {
  "red-scarf": new Audio("素材/音频/audio/sfx/fabric-unfold.mp3"),
  "school-card": new Audio("素材/音频/audio/sfx/school-badge-flip.mp3"),
  badge: new Audio("素材/音频/audio/sfx/school-badge-flip.mp3"),
  "pencil-case": new Audio("素材/音频/audio/sfx/pencil-case-open.mp3"),
  dictionary: new Audio("素材/音频/audio/sfx/book-page-turn2.mp3"),
  "jump-rope": new Audio("素材/音频/audio/sfx/跳绳操场.MP3"),
  "desk-note": new Audio("素材/音频/audio/sfx/paper-rustle.mp3"),
  "password-book": new Audio("素材/音频/audio/sfx/diary-lock-open.mp3"),
};
let activeBagSfx = null;
const bagOpenSfx = new Audio("素材/音频/audio/sfx/bag-zipper.mp3");
const bagCloseSfx = new Audio("素材/音频/audio/sfx/bag-zipper.mp3");
const computerBootSfx = new Audio("素材/音频/audio/sfx/电脑开机.MP3");
const computerCloseSfx = new Audio("素材/音频/audio/sfx/电脑关机.MP3");
const uiClickSfx = new Audio("素材/音频/audio/sfx/ui-click.mp3");
const roomBgm = new Audio("素材/音频/audio/music/JINBAO - 夏日约定.mp3");
const roomCicadas = new Audio("素材/音频/audio/ambience/cicadas-loop.mp3");
roomBgm.loop = true;
roomCicadas.loop = true;
roomBgm.volume = 0.18;
roomCicadas.volume = 0.08;
let roomAudioStarted = false;
let roomAudioMuted = false;
function startRoomAudio() {
  if (roomAudioStarted || roomAudioMuted) return;
  roomAudioStarted = true;
  Promise.all([roomBgm.play(), roomCicadas.play()]).catch(() => {
    roomAudioStarted = false;
  });
}
function pauseRoomAudio() {
  roomBgm.pause();
  roomCicadas.pause();
}
function resumeRoomAudio() {
  if (roomAudioMuted) return;
  if (!roomAudioStarted) return startRoomAudio();
  roomBgm.play().catch(() => {});
  roomCicadas.play().catch(() => {});
}
const computerClickSfx = new Audio("素材/音频/audio/sfx/mouse-click.mp3");
const matchSuccessSfx = new Audio("素材/音频/audio/sfx/match-success.mp3");
const matchErrorSfx = new Audio("素材/音频/audio/sfx/连连看配对错误.MP3");
const matchHintSfx = new Audio("素材/音频/audio/sfx/match-hint.mp3");
const farmActionSfx = { water: new Audio("素材/音频/audio/sfx/浇水.MP3"), weed: new Audio("素材/音频/audio/sfx/farm-weed.mp3"), harvest: new Audio("素材/音频/audio/sfx/farm-harvest.wav") };
const mp3Player = document.querySelector("[data-mp3-player]");
const passwordButtonSfx = new Audio("素材/音频/audio/sfx/password-button.mp3");
const passwordErrorSfx = new Audio("素材/音频/audio/sfx/password-error-click.mp3");
const mp3Audio = document.querySelector("[data-mp3-audio]");
const mp3StartSfx = new Audio("素材/音频/audio/sfx/mp3-button.mp3");
const mp3ButtonSfx = new Audio("素材/音频/audio/sfx/mp3-button.mp3");
let mp3ProgrammaticToggle = false;
let computerActiveApp = "match";
let activeRegionWasComplete = false;
const mp3Status = document.querySelector("[data-mp3-status]");
const MP3_COMPLETION_SECONDS = 30;
const COMPUTER_MODULE_DISABLED = true;
const DEFAULT_ROOM_GUIDE = "点一点房间里发光的物品，看看小满还没收好什么。";
const COMPUTER_DISCOVERY_GUIDE = "电脑里的小游戏和留言，都还在等你发现。";
const MATCH_COMPLETE_GUIDE = "恭喜你！水果都找到自己的伙伴啦！";
const FARM_COMPLETE_GUIDE = "农田都照料好了，原来有人在偷偷帮你。";
const regionStates = { bag: "closed", computer: "closed", computerClosedOnce: false, drawer: "closed", drawerRecheck: false, drawerFirstCompletion: false, box: "closed", boxFinishedPreview: false, heightSeen: false, matchPairs: 0, matchFirst: null, matchLocked: false, matchHintUsed: false, farmMessageSeen: false, drawerPhotoSeen: false, mp3Started: false, mp3Completed: false, boxPhotoSide: "front", boxPhotoSeen: false };
const MODULE_ORDER = ["bag", "computer", "drawer", "mp3", "height", "box"];

function isModuleComplete(region) {
  if (region === "bag") return regionStates.bag === "complete";
  if (region === "computer") return computerIsComplete() && regionStates.computerClosedOnce;
  if (region === "drawer") return regionStates.drawerPhotoSeen;
  if (region === "mp3") return regionStates.mp3Completed;
  if (region === "box") return regionStates.boxPhotoSeen;
  if (region === "height") return regionStates.heightSeen;
  return false;
}

function isModuleUnlocked(region) {
  const index = MODULE_ORDER.indexOf(region);
  return index >= 0 && (index === 0 || MODULE_ORDER.slice(0, index).every((item) => isModuleComplete(item)));
}

function updateNextHotspot() {
  const next = MODULE_ORDER.find((region) => !isModuleComplete(region));
  hotspots.forEach((hotspot) => {
    const region = hotspot.dataset.region || (hotspot === computerHotspot ? "computer" : "");
    hotspot.classList.toggle("is-next", region === next);
    hotspot.classList.toggle("is-locked", Boolean(region && MODULE_ORDER.includes(region) && !isModuleUnlocked(region)));
    hotspot.setAttribute("aria-disabled", String(Boolean(region && MODULE_ORDER.includes(region) && !isModuleUnlocked(region))));
  });
  progressItems.forEach((item) => {
    const region = item.dataset.region;
    item.classList.toggle("is-recommended", region === next);
    item.classList.toggle("is-locked", Boolean(MODULE_ORDER.includes(region) && !isModuleUnlocked(region)));
    item.classList.toggle("is-done", isModuleComplete(region));
  });
}

function setRoomDimmed(isDimmed) {
  roomDim.hidden = !isDimmed;
  roomDim.classList.toggle("is-clear", !isDimmed);
  if (isDimmed) roomDim.style.removeProperty("display");
  else roomDim.style.setProperty("display", "none", "important");
}

const fruitAssets = [
  ["apple", "苹果", "电脑_连连看_苹果_桌面.png"],
  ["banana", "香蕉", "电脑_连连看_香蕉_桌面.png"],
  ["strawberry", "草莓", "电脑_连连看_草莓_桌面.png"],
  ["watermelon", "西瓜", "电脑_连连看_西瓜_桌面.png"],
  ["orange", "橙子", "电脑_连连看_橙子_桌面.png"],
  ["grape", "葡萄", "电脑_连连看_葡萄_桌面.png"],
  ["pear", "梨", "电脑_连连看_梨_桌面.png"],
  ["peach", "桃子", "电脑_连连看_桃子_桌面.png"],
];

function computerIsComplete() {
  return regionStates.matchPairs === fruitAssets.length && farmCompletedPlots.size === farmPlots.length && regionStates.farmMessageSeen;
}

function finishComputerGames(lastGame) {
  const closePrompt = "留言都看完啦，看看房间还有什么没收拾。";
  const completionPrompt = lastGame === "match" ? MATCH_COMPLETE_GUIDE : FARM_COMPLETE_GUIDE;
  if (lastGame === "match" && regionStates.matchPairs !== fruitAssets.length) return;
  thought.hidden = !computerIsComplete();
  thought.textContent = computerIsComplete() ? closePrompt : "";
  if (lastGame === "match" && !computerIsComplete()) focusCard.classList.add("is-match-complete");
  if (!computerIsComplete()) return;
  focusCopy.textContent = "屏幕暗下来了，重要的留言也都好好留在记忆里。";
  focusCard.classList.add("is-complete");
  focusComplete.hidden = false;
  focusComplete.textContent = "关闭电脑";
  focusClose.hidden = true;
}

function updateComputerThoughtForApp(app) {
  const closePrompt = "留言都看完啦，看看房间还有什么没收拾。";
  const completionPrompt = app === "match" && regionStates.matchPairs === fruitAssets.length
    ? MATCH_COMPLETE_GUIDE
    : app === "farm" && regionStates.farmMessageSeen
      ? FARM_COMPLETE_GUIDE
      : "";
  thought.hidden = !computerIsComplete();
  thought.textContent = completionPrompt
    ? computerIsComplete() ? closePrompt : completionPrompt
    : "";
  if (!computerIsComplete()) thought.textContent = "";
}

function updateComputerTabPrompt() {
  const matchDone = regionStates.matchPairs === fruitAssets.length;
  const farmDone = regionStates.farmMessageSeen && farmCompletedPlots.size === farmPlots.length;
  document.querySelectorAll("[data-computer-app]").forEach((tab) => {
    const shouldPulse = !computerIsComplete()
      && ((tab.dataset.computerApp === "farm" && matchDone && !farmDone)
        || (tab.dataset.computerApp === "match" && farmDone && !matchDone));
    tab.classList.toggle("is-next", shouldPulse);
  });
}

function buildMatchBoard() {
  if (!matchBoard) return;
  const cards = fruitAssets.flatMap(([id, label, file]) => [
    { id, label, file },
    { id, label, file },
  ]);
  const arranged = [...cards];
  for (let index = arranged.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [arranged[index], arranged[randomIndex]] = [arranged[randomIndex], arranged[index]];
  }
  matchBoard.replaceChildren(...arranged.map(({ id, label, file }, index) => {
    const button = document.createElement("button");
    button.className = "match-card";
    button.type = "button";
    button.dataset.matchId = id;
    button.dataset.matchIndex = String(index);
    button.setAttribute("aria-label", `水果卡片 ${label}`);
    button.innerHTML = `<img src="素材/图片【移除背景】/${file}" alt="${label}">`;
    return button;
  }));
}

buildMatchBoard();

function boxPrerequisitesComplete() {
  return (regionStates.bag === "open" || regionStates.bag === "complete")
    && regionStates.computer === "open"
    && regionStates.drawer === "open"
    && regionStates.mp3Started;
}

function updateBoxLock() {
  const boxProgress = document.querySelector('[data-region="box"]');
  const unlocked = isModuleUnlocked("box");
  boxProgress.classList.toggle("is-locked", !unlocked);
  boxProgress.setAttribute("aria-label", unlocked ? "纸箱，可探索" : "纸箱，暂未解锁");
  if (regionStates.box === "open") {
    boxObject.src = "素材/图片【移除背景】/纸箱_搬家纸箱_打开_桌面.png";
    boxObject.alt = "打开的搬家纸箱";
  }
}

function nextStoryPrompt() {
  if ([...bagItems].some((item) => !item.classList.contains("is-picked"))) {
    return "先看看书包吧，里面好像还有东西没拿出来。";
  }
  if (!computerIsComplete()) {
    return "对了，电脑里好像还有同桌给我的留言。";
  }
  if (!regionStates.drawerPhotoSeen) {
    return "桌子下面那个抽屉，也好久没打开了。";
  }
  if (!regionStates.mp3Completed) {
    return "差点忘了，MP3 还没收起来呢。";
  }
  if (!regionStates.heightSeen) {
    return "歌声停下来了，墙上的身高刻度还记着小满长大的脚步，去看看吧。";
  }
  if (!regionStates.boxPhotoSeen) {
    return "房间里的东西都收拾好了，最后看看角落里的纸箱吧。";
  }
  return "房间终于收拾好了。";
}

function completedStoryPrompt(region) {
  const completionCopy = {
    bag: "书包里的小物件，都重新回到它们的位置了。",
    computer: "屏幕里的小游戏和留言，都看完了。",
    drawer: "抽屉里的旧时光，暂时收拾好了。",
    mp3: "耳机里的夏天，又听完了一小段。",
    height: "墙上的身高刻度，也记下了小满长大的脚步。",
    box: "纸箱里的旧物，都重新见过一面了。",
  }[region];
  const nextCopy = {
    bag: "电脑屏幕还亮着，或许还留着同桌的留言。",
    computer: "桌子下面的抽屉，也该打开看看了。",
    drawer: "差点忘了，MP3 还在等那首熟悉的歌。",
    mp3: "歌声停下来了，墙上的身高刻度还记着小满长大的脚步，去看看吧。",
    height: "角落里的纸箱，也该最后打开看看了。",
    height: "角落里的纸箱，也该最后打开看看了。",
    box: "这个夏天，也该好好告别了。",
  }[region];
  return `${completionCopy}\n${nextCopy}`;
}

function openRegion(region) {
  if (MODULE_ORDER.includes(region) && !isModuleUnlocked(region)) return;
  activeRegionWasComplete = isModuleComplete(region);
  focusComplete.hidden = false;
  if (region === "drawer" && regionStates.drawerPhotoSeen) {
    shell.dataset.focusRegion = "drawer";
    focusCard.style.display = "";
    focusCard.classList.remove("is-drawer-recheck");
    regionStates.drawerFirstCompletion = false;
    regionStates.drawer = "open";
    roomScene.classList.add("is-drawer-open");
    modulePreview.hidden = true;
    moduleImage.removeAttribute("src");
    drawerItemsPanel.hidden = true;
    drawerPhoto.hidden = true;
    focusTitle.textContent = "书桌抽屉";
    focusCopy.textContent = regionStates.drawerPhotoSeen
      ? "抽屉合上了，重要的回忆也都好好存着。"
      : "抽屉拉开了，里面还有几件老物件。";
    focusComplete.textContent = "关闭抽屉";
    focusClose.hidden = false;
    focusClose.textContent = "再检查一遍";
    thought.textContent = "抽屉也整理好啦，看看房间还有什么没收拾。";
    focusCard.hidden = false;
    progressItems.forEach((item) => item.classList.toggle("is-active", item.dataset.region === region));
    return;
  }
  if (region === "computer" && COMPUTER_MODULE_DISABLED) {
    if (regionStates.computer === "complete") {
      openComputerModule();
      showComputerCompleteCard();
      return;
    }
    if (regionStates.computer === "open") {
      openComputerModule();
      return;
    }
    openComputerPreview();
    return;
  }
  focusCard.style.display = "";
  focusCard.classList.toggle("is-computer-intro", !computerIsComplete());
  focusClose.hidden = false;
  focusComplete.disabled = false;
  computerPreviewCard.hidden = true;
  focusCard.classList.remove("is-drawer-recheck");
  if (region === "computer" && regionStates.computer === "closed") {
    const previousRegion = shell.dataset.focusRegion;
    if (previousRegion === "mp3") mp3Audio.pause();
    shell.dataset.focusRegion = region;
    roomScene.classList.remove("is-drawer-open");
    focusCard.hidden = true;
    focusCard.style.display = "none";
    computerModule.hidden = true;
    modulePreview.hidden = true;
    mp3Player.hidden = true;
    bagItemsPanel.hidden = true;
    drawerItemsPanel.hidden = true;
    drawerPhoto.hidden = true;
    boxItemsPanel.hidden = true;
    boxPhotoDetail.hidden = true;
    boxDetailDialog.hidden = true;
    boxItemDetail.hidden = true;
    noteDetail.hidden = true;
    passwordDetail.hidden = true;
    progressItems.forEach((item) => item.classList.toggle("is-active", item.dataset.region === region));
    return;
  }
  if (region === "height") {
    shell.dataset.focusRegion = region;
    setRoomDimmed(true);
    heightHotspot?.classList.remove("is-complete-hint");
    regionStates.heightSeen = true;
    focusTitle.textContent = "身高刻度";
    focusCopy.textContent = "156cm——这是小满最近一次的身高。\n下一次的身高，就要画在新家的墙上了。";
    focusComplete.textContent = "返回房间";
    focusClose.hidden = true;
    focusCard.hidden = false;
    thought.hidden = true;
    return;
  }
  setRoomDimmed(true);
  if (region === "computer") {
    const previousRegion = shell.dataset.focusRegion;
    if (previousRegion === "mp3") mp3Audio.pause();
    shell.dataset.focusRegion = region;
    roomScene.classList.remove("is-drawer-open");
    modulePreview.hidden = regionStates.computer !== "closed";
    moduleImage.src = "素材/图片【移除背景】/电脑_旧电脑_开机_桌面.png";
    moduleImage.alt = "开机的旧电脑";
    computerModule.hidden = regionStates.computer === "closed";
    bagItemsPanel.hidden = true;
    drawerItemsPanel.hidden = true;
    drawerPhoto.hidden = true;
    noteDetail.hidden = true;
    passwordDetail.hidden = true;
    mp3Player.hidden = true;
    boxItemsPanel.hidden = true;
    boxPhotoDetail.hidden = true;
    boxItemDetail.hidden = true;
    boxPhotoBackText.hidden = true;
    boxPhotoFlip.hidden = false;
    boxPhotoFlip.textContent = "翻看背面";
    focusTitle.textContent = regionNames.computer;
    focusCopy.textContent = regionStates.computer === "open" ? "屏幕亮了，两个熟悉的小游戏还在等待。" : "旧电脑安静地等着，先把它打开吧。";
    document.querySelector("[data-focus-complete]").textContent = regionStates.computer === "closed" ? "打开电脑" : computerIsComplete() ? "关闭电脑" : "继续查看";
    focusCard.hidden = false;
    progressItems.forEach((item) => item.classList.toggle("is-active", item.dataset.region === region));
    return;
  }
  if (region === "box") {
    regionStates.boxFinishedPreview = Boolean(regionStates.boxPhotoSeen);
    focusCopy.hidden = false;
    const previousRegion = shell.dataset.focusRegion;
    if (previousRegion === "mp3") mp3Audio.pause();
    shell.dataset.focusRegion = region;
    updateBoxLock();
    roomScene.classList.remove("is-drawer-open");
    computerModule.hidden = true;
    modulePreview.hidden = regionStates.box === "open";
    moduleImage.src = regionStates.box === "open"
      ? "素材/图片【移除背景】/纸箱_搬家纸箱_打开_桌面.png"
      : "素材/图片【移除背景】/纸箱_搬家纸箱_解锁_桌面.png";
    moduleImage.alt = regionStates.box === "open" ? "打开的搬家纸箱" : "已解锁的搬家纸箱";
    bagItemsPanel.hidden = true;
    noteDetail.hidden = true;
    passwordDetail.hidden = true;
    mp3Player.hidden = true;
    drawerItemsPanel.hidden = true;
    drawerPhoto.hidden = true;
    boxItemsPanel.hidden = regionStates.box === "closed" || regionStates.boxPhotoSeen;
    boxPhotoDetail.hidden = true;
    boxPhotoBackText.hidden = true;
    boxPhotoFlip.hidden = false;
    focusTitle.textContent = "纸箱里的东西";
    focusCopy.textContent = regionStates.boxPhotoSeen
      ? "纸箱收好了，这个夏天也被好好装起来了。"
      : regionStates.box === "open"
      ? "纸箱打开了，里面是搬家前最后要收好的东西。"
      : boxPrerequisitesComplete()
        ? "纸箱已经打开了，先看看里面有什么。"
        : "纸箱还没完全收好，先打开看看吧。";
    thought.textContent = regionStates.boxPhotoSeen ? "纸箱也整理好啦，看看房间还有什么没收拾。" : regionCopy.box;
    if (regionStates.box === "open" && !regionStates.boxPhotoSeen) {
      const boxHasProgress = [...boxItems].some((item) => item.classList.contains("is-picked"));
      thought.hidden = boxHasProgress;
      thought.textContent = "每一件物品都有一段故事，点击看看它们藏着什么回忆吧。";
    }
    document.querySelector("[data-focus-complete]").textContent = regionStates.box === "closed" ? "打开纸箱" : "收好纸箱";
    if (regionStates.boxPhotoSeen) {
      modulePreview.hidden = true;
      moduleImage.removeAttribute("src");
      moduleImage.alt = "";
      focusClose.hidden = false;
      focusClose.textContent = "再检查一遍";
    }
    focusCard.hidden = false;
    progressItems.forEach((item) => item.classList.toggle("is-active", item.dataset.region === region));
    return;
  }
  const previousRegion = shell.dataset.focusRegion;
  if (previousRegion === "mp3" && region !== "mp3") mp3Audio.pause();
  shell.dataset.focusRegion = region;
  roomScene.classList.toggle("is-drawer-open", region === "drawer" && regionStates.drawer === "open");
  if (region === "drawer" && regionStates.drawer === "closed" && regionStates.drawerPhotoSeen) {
    regionStates.drawer = "open";
    roomScene.classList.add("is-drawer-open");
    modulePreview.hidden = true;
    moduleImage.removeAttribute("src");
    focusCopy.textContent = regionStates.drawerPhotoSeen
      ? "抽屉合上了，重要的回忆也都好好存着。"
      : "抽屉拉开了，里面还有几件老物件。";
    thought.textContent = DEFAULT_ROOM_GUIDE;
  }
  modulePreview.hidden = region !== "mp3" && !(region === "drawer" && regionStates.drawer === "closed");
  computerModule.hidden = true;
  moduleImage.removeAttribute("src");
  moduleImage.alt = "";
  bagItemsPanel.hidden = region !== "bag" || regionStates.bag !== "open";
  boxItemsPanel.hidden = true;
  boxPhotoDetail.hidden = true;
  boxDetailDialog.hidden = true;
  noteDetail.hidden = true;
  passwordDetail.hidden = true;
  mp3Player.hidden = region !== "mp3" || !regionStates.mp3Started;
  if (region === "bag" && regionStates.bag === "open") {
    const bagItemsComplete = [...bagItems].every((item) => item.classList.contains("is-picked"));
    const bagHasProgress = [...bagItems].some((item) => item.classList.contains("is-picked"));
    focusCopy.textContent = "书包打开了，里面还有几样东西没有收好。";
    thought.hidden = bagHasProgress && !bagItemsComplete;
    thought.textContent = bagItemsComplete
      ? "书包已经整理好啦，看看房间还有什么没收拾。"
      : "每一件物品都有一段故事，点击看看它们藏着什么回忆吧。";
  }
  if (region === "mp3") {
    focusClose.hidden = false;
    focusClose.textContent = regionStates.mp3Completed ? "关闭MP3" : "返回房间";
    focusCopy.hidden = false;
    thought.hidden = false;
    moduleImage.src = regionStates.mp3Started
      ? "素材/图片【移除背景】/MP3_MP3_播放_桌面.png"
      : "素材/图片【移除背景】/MP3_MP3_关闭_桌面.png";
    moduleImage.alt = regionStates.mp3Started ? "播放中的 MP3 播放器" : "MP3 播放器";
    modulePreview.hidden = false;
    focusCopy.textContent = regionStates.mp3Completed
      ? "歌曲正在播放，可以继续听，也可以随时暂停。"
      : regionStates.mp3Started
        ? "歌曲正在继续播放，可以随时暂停或继续。"
        : "耳机线已经接好，播放一段小满收藏的歌吧。";
    thought.textContent = regionStates.mp3Completed
      ? "MP3也听完啦，看看房间还有什么没收拾。"
      : regionStates.mp3Started
        ? "这首歌一响起，那个夏天好像又回来了……"
        : "快打开MP3听听是哪首歌曲！";
    focusComplete.textContent = regionStates.mp3Completed ? "继续播放" : regionStates.mp3Started ? "继续播放" : "开始播放";
  }
  drawerItemsPanel.hidden = region !== "drawer" || regionStates.drawer === "closed" || [...drawerItems].every((item) => item.classList.contains("is-picked"));
  drawerPhoto.hidden = region !== "drawer" || regionStates.drawer === "closed" || [...drawerItems].some((item) => !item.classList.contains("is-picked"));
  if (region === "drawer" && regionStates.drawer === "open") {
    const drawerItemsComplete = [...drawerItems].every((item) => item.classList.contains("is-picked"));
    const drawerHasProgress = [...drawerItems].some((item) => item.classList.contains("is-picked"));
    focusCopy.textContent = "抽屉拉开了，里面还有几件老物件。";
    thought.hidden = drawerHasProgress && !drawerItemsComplete;
    thought.textContent = drawerItemsComplete
      ? "抽屉底下好像还压着什么......"
      : "每一件物品都有一段故事，点击看看它们藏着什么回忆吧。";
  }
  if (region === "drawer" && regionStates.drawer === "closed") {
    moduleImage.src = "素材/图片【移除背景】/抽屉_书桌抽屉_打开_桌面.png";
    moduleImage.alt = "打开的书桌抽屉";
    focusCopy.textContent = "抽屉还没打开，先拉开它看看吧。";
  }
  if (region === "bag" && ["open", "complete"].includes(regionStates.bag)) {
    bagObject.src = "素材/图片【移除背景】/书包_旧书包_打开_桌面.png";
    if (regionStates.bag === "complete") {
      bagObject.src = "素材/图片【移除背景】/书包_旧书包_完成_桌面.png";
      bagObject.alt = "收好的书包";
    }
  }
  if (region === "bag" && regionStates.bag === "closed") {
    moduleImage.src = "素材/图片【移除背景】/书包_旧书包_关闭_桌面.png";
    moduleImage.alt = "关闭的书包";
    modulePreview.hidden = false;
  }
  focusTitle.textContent = regionNames[region];
  if (region !== "mp3") {
    focusCopy.textContent = region === "bag" && regionStates.bag === "complete"
      ? "拉链拉好了，重要的东西也都好好收着。"
      : region === "bag" && regionStates.bag === "open"
        ? "书包打开了，里面还有几样东西没有收好。"
        : region === "box" && [...boxItems].every((entry) => entry.classList.contains("is-picked"))
          ? "纸箱收好了，这个夏天也被好好装起来了。"
        : region === "bag" && regionStates.bag === "closed"
          ? "拉链还开着……先把里面的东西收拾好吧。"
      : region === "drawer" && regionStates.drawer === "open"
        ? "抽屉拉开了，里面还有几件老物件。"
      : region === "drawer" && regionStates.drawer === "closed"
          ? "抽屉里好像藏着几件不该被忘记的东西。"
        : regionCopy[region];
    if (region === "bag" || region === "drawer") {
      if (!(region === "drawer" && regionStates.drawer === "open") && !(region === "bag" && regionStates.bag === "open")) {
        thought.textContent = region === "bag" && regionStates.bag === "complete"
          ? "书包已经整理好啦，看看房间还有什么没收拾。"
          : regionCopy[region];
      }
    }
  }
  document.querySelector("[data-focus-complete]").textContent = region === "bag" && regionStates.bag === "closed"
    ? "打开书包"
    : region === "bag" && regionStates.bag === "complete"
      ? "收好书包"
    : region === "drawer" && regionStates.drawer === "closed"
      ? "打开抽屉"
    : region === "drawer" && regionStates.drawerPhotoSeen
      ? "关闭抽屉"
      : region === "mp3" && regionStates.mp3Started
        ? "继续播放"
        : region === "mp3"
          ? "开始播放"
      : "继续查看";
  if (region === "bag" && regionStates.bag === "complete") {
    focusComplete.textContent = "收好书包";
    focusClose.hidden = false;
    focusClose.textContent = "再检查一遍";
  }
  if (region === "drawer" && regionStates.drawerPhotoSeen) {
    focusComplete.textContent = "关闭抽屉";
    focusClose.hidden = false;
    focusClose.textContent = "再检查一遍";
  } else if (region === "drawer" && regionStates.drawer === "open") {
    focusComplete.textContent = "继续查看";
    focusClose.hidden = false;
    focusClose.textContent = "返回房间";
  } else if (region === "drawer") {
    focusClose.hidden = false;
    focusClose.textContent = "返回房间";
  }
  focusCard.hidden = false;
  progressItems.forEach((item) => item.classList.toggle("is-active", item.dataset.region === region));
}

function closeRegion() {
  const closingRegion = shell.dataset.focusRegion;
  thought.classList.remove("is-wide");
  computerPreviewCard.hidden = true;
  if (shell.dataset.focusRegion === "bag" && regionStates.bag === "closed") {
    bagObject.src = "素材/图片【移除背景】/书包_旧书包_关闭_桌面.png";
    bagObject.alt = "关闭的书包";
  }
  if (closingRegion === "computer") {
    shell.classList.remove("is-computer-recheck");
    computerModule.hidden = true;
    modulePreview.hidden = true;
    moduleImage.removeAttribute("src");
    computerObject.src = computerIsComplete()
      ? "素材/图片【移除背景】/电脑_旧电脑_关闭_桌面.png"
      : "素材/图片【移除背景】/电脑_旧电脑_开机_桌面.png";
    if (computerIsComplete()) {
      regionStates.computer = "complete";
      regionStates.computerClosedOnce = true;
    }
  }
  if (closingRegion !== "drawer" || regionStates.drawer !== "open") roomScene.classList.remove("is-drawer-open");
  shell.removeAttribute("data-focus-region");
  setRoomDimmed(false);
  focusCard.hidden = true;
  thought.hidden = false;
  focusCard.style.display = "none";
  modulePreview.hidden = true;
  bagItemsPanel.hidden = true;
  noteDetail.hidden = true;
  passwordDetail.hidden = true;
  mp3Player.hidden = true;
  computerModule.hidden = true;
  if (closingRegion === "mp3") {
    mp3Audio.pause();
    resumeRoomAudio();
    thought.textContent = regionStates.mp3Completed
      ? activeRegionWasComplete ? nextStoryPrompt() : completedStoryPrompt("mp3")
      : DEFAULT_ROOM_GUIDE;
    if (regionStates.mp3Completed) thought.classList.add("is-wide");
  }
  Object.values(drawerSfx).forEach((sfx) => { sfx.pause(); sfx.currentTime = 0; });
  activeDrawerSfx = null;
  if (closingRegion === "bag") {
    shell.classList.remove("is-bag-recheck");
    thought.textContent = [...bagItems].every((item) => item.classList.contains("is-picked"))
      ? activeRegionWasComplete ? nextStoryPrompt() : completedStoryPrompt("bag")
      : DEFAULT_ROOM_GUIDE;
  }
  if (closingRegion === "drawer") {
    thought.textContent = regionStates.drawerPhotoSeen
      ? activeRegionWasComplete ? nextStoryPrompt() : completedStoryPrompt("drawer")
      : DEFAULT_ROOM_GUIDE;
    if (regionStates.drawerPhotoSeen) {
      regionStates.drawer = "closed";
      roomScene.classList.remove("is-drawer-open");
      const closeSfx = focusCard.classList.contains("is-drawer-recheck") || regionStates.drawerFirstCompletion ? drawerPullSfx : uiClickSfx;
      closeSfx.currentTime = 0;
      closeSfx.play().catch(() => {});
    }
  }
  if (closingRegion === "box") {
    thought.textContent = regionStates.boxPhotoSeen
      ? activeRegionWasComplete ? nextStoryPrompt() : completedStoryPrompt("box")
      : DEFAULT_ROOM_GUIDE;
  }
  if (closingRegion === "computer" && !computerIsComplete()) {
    thought.textContent = DEFAULT_ROOM_GUIDE;
  }
  if (closingRegion === "computer" && computerIsComplete()) {
    thought.textContent = activeRegionWasComplete
      ? nextStoryPrompt()
      : "电脑里的小游戏和留言，都看完啦。\n桌子下面的抽屉，也该打开看看了。";
  }
  if (closingRegion === "height") {
    thought.textContent = activeRegionWasComplete ? nextStoryPrompt() : completedStoryPrompt("height");
    thought.classList.add("is-wide");
  }
  drawerItemsPanel.hidden = true;
  drawerPhoto.hidden = true;
  boxItemsPanel.hidden = true;
  boxPhotoDetail.hidden = true;
  progressItems.forEach((item) => item.classList.remove("is-active"));
  updateNextHotspot();
}

function showFinalEnding() {
  endingReopen.hidden = true;
  shell.dataset.focusRegion = "ending";
  setRoomDimmed(true);
  focusTitle.textContent = "这个夏天";
  focusCopy.hidden = false;
  focusCopy.textContent = "东西都收好了，\n这个夏天也要告一段落了。";
  focusClose.hidden = false;
  focusClose.textContent = "再看看房间";
  focusComplete.hidden = false;
  focusComplete.textContent = "结束回忆";
  focusCard.hidden = false;
  focusCard.style.display = "";
  thought.hidden = true;
}

function openComputerPreview() {
  focusCard.hidden = true;
  focusCard.style.display = "none";
  computerModule.hidden = true;
  modulePreview.hidden = true;
  shell.dataset.focusRegion = "computer";
  setRoomDimmed(true);
  thought.textContent = "快打开电脑看看里面藏着哪些回忆！";
  computerPreviewCard.hidden = false;
}

function closeComputerPreview(event) {
  event?.preventDefault();
  event?.stopPropagation();
  computerPreviewCard.hidden = true;
  computerModule.hidden = true;
  modulePreview.hidden = true;
  moduleImage.removeAttribute("src");
  shell.removeAttribute("data-focus-region");
  setRoomDimmed(false);
  focusCard.hidden = true;
  focusCard.style.display = "none";
  roomScene.classList.remove("is-drawer-open");
  progressItems.forEach((item) => item.classList.remove("is-active"));
  computerObject.src = "素材/图片【移除背景】/电脑_旧电脑_关闭_桌面.png";
  thought.textContent = DEFAULT_ROOM_GUIDE;
}

function openComputerModule() {
  focusCard.classList.remove("is-match-complete");
  const shouldPlayBootSfx = regionStates.computer === "closed";
  if (shouldPlayBootSfx) {
    computerBootSfx.currentTime = 0;
    computerBootSfx.play().catch(() => {});
  }
  shell.dataset.focusRegion = "computer";
  regionStates.computer = "open";
  computerObject.src = "素材/图片【移除背景】/电脑_旧电脑_开机_桌面.png";
  computerPreviewCard.hidden = true;
  focusCard.style.display = "";
  focusCard.classList.toggle("is-complete", computerIsComplete());
  focusTitle.textContent = "电脑";
  focusCopy.textContent = "屏幕亮了，两个熟悉的小游戏还在等待。";
  modulePreview.hidden = true;
  moduleImage.src = "素材/图片【移除背景】/电脑_旧电脑_开机_桌面.png";
  moduleImage.alt = "开机的旧电脑";
  computerModule.hidden = false;
  focusComplete.hidden = false;
  focusComplete.textContent = computerIsComplete() ? "关闭电脑" : "返回房间";
  focusClose.hidden = true;
  if (computerIsComplete()) focusComplete.hidden = false;
  document.querySelectorAll("[data-computer-app]").forEach((tab) => {
    const isActive = tab.dataset.computerApp === computerActiveApp;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
  document.querySelectorAll("[data-computer-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.computerPanel !== computerActiveApp;
  });
  updateComputerThoughtForApp(computerActiveApp);
  updateComputerTabPrompt();
  focusCard.hidden = false;
}

function showComputerCompleteCard() {
  regionStates.computer = "complete";
  focusCard.classList.remove("is-computer-intro");
  computerModule.hidden = true;
  modulePreview.hidden = true;
  moduleImage.removeAttribute("src");
  focusCopy.textContent = "屏幕暗下来了，重要的留言也都好好留在记忆里。";
  focusComplete.hidden = false;
  focusComplete.disabled = false;
  focusComplete.textContent = "关闭电脑";
  focusClose.hidden = false;
  focusClose.textContent = "再检查一遍";
  thought.textContent = "留言都看完啦，看看房间还有什么没收拾。";
}

function openComputerEntry() {
  if (regionStates.computer === "complete") {
    openComputerModule();
    showComputerCompleteCard();
    return;
  }
  if (region === "drawer" && regionStates.drawerPhotoSeen) {
    closeRegion();
    return;
  }
  if (regionStates.computer === "open") {
    openComputerModule();
    return;
  }
  openComputerPreview();
}

computerPreviewClose?.addEventListener("click", closeComputerPreview);
computerPreviewOpen?.addEventListener("click", openComputerModule);

function updateBagProgress() {
  const remaining = [...bagItems].filter((entry) => !entry.classList.contains("is-picked")).length;
  focusClose.hidden = !remaining;
  focusComplete.hidden = false;
  focusComplete.textContent = remaining ? "继续查看" : "收好书包";
}

function openNextBagItem() {
  const nextItem = [...bagItems].find((item) => !item.classList.contains("is-picked"));
  nextItem?.click();
}

document.querySelectorAll("[data-region]").forEach((control) => {
  control.addEventListener("click", () => {
    if (control.classList.contains("room-hotspot")) {
      uiClickSfx.currentTime = 0;
      uiClickSfx.play().catch(() => {});
    }
    openRegion(control.dataset.region);
  });
});
document.addEventListener("click", startRoomAudio, { once: true });
startRoomAudio();

updateNextHotspot();

focusClose?.addEventListener("click", (event) => {
  event.preventDefault();
  if (shell.dataset.focusRegion === "ending") {
    shell.removeAttribute("data-focus-region");
    setRoomDimmed(false);
    focusCard.hidden = true;
    focusCard.style.display = "none";
    thought.hidden = false;
    thought.textContent = "房间终于收拾好了。";
    endingReopen.hidden = false;
    return;
  }
  if (shell.dataset.focusRegion === "box" && regionStates.boxPhotoSeen && focusClose.textContent === "再检查一遍") {
    boxRecheckSfx.currentTime = 0;
    boxRecheckSfx.play().catch(() => {});
    regionStates.boxFinishedPreview = false;
    boxItemsPanel.hidden = false;
    thought.hidden = true;
    modulePreview.hidden = true;
    focusCopy.textContent = "纸箱收好了，这个夏天也被好好装起来了。";
    focusCopy.hidden = false;
    focusComplete.textContent = "收好纸箱";
    focusClose.hidden = true;
    return;
  }
  event.stopPropagation();
  if (shell.dataset.focusRegion === "bag" && regionStates.bag === "complete") {
    if (focusClose.textContent === "再检查一遍") {
      bagOpenSfx.currentTime = 0;
      bagOpenSfx.play().catch(() => {});
      shell.classList.add("is-bag-recheck");
      bagItemsPanel.hidden = false;
      focusCopy.textContent = "拉链拉好了，重要的东西也都好好收着。";
      focusComplete.textContent = "收好书包";
      focusClose.hidden = true;
      return;
    }
  }
  if (shell.dataset.focusRegion === "drawer" && regionStates.drawerPhotoSeen && focusClose.textContent === "再检查一遍") {
    drawerPullSfx.currentTime = 0;
    drawerPullSfx.play().catch(() => {});
    regionStates.drawerRecheck = true;
    regionStates.drawer = "open";
    roomScene.classList.add("is-drawer-open");
    drawerItemsPanel.hidden = false;
    thought.hidden = false;
    thought.textContent = "抽屉已经整理好啦，看看房间还有什么没收拾。";
    drawerPhoto.hidden = false;
    focusComplete.textContent = "关闭抽屉";
    focusClose.hidden = true;
    focusCard.classList.add("is-drawer-recheck");
    return;
  }
  if (shell.dataset.focusRegion === "computer" && regionStates.computer === "complete" && focusClose.textContent === "再检查一遍") {
    computerBootSfx.currentTime = 0;
    computerBootSfx.play().catch(() => {});
    shell.classList.add("is-computer-recheck");
    computerModule.hidden = false;
    focusComplete.textContent = "关闭电脑";
    focusClose.hidden = true;
    return;
  }
  if (["bag", "drawer", "mp3", "box"].includes(shell.dataset.focusRegion) && focusClose.textContent === "返回房间") {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
  }
  closeRegion();
});
document.querySelector("[data-focus-complete]").addEventListener("click", () => {
  const region = shell.dataset.focusRegion;
  if (region === "ending") {
    focusTitle.textContent = "谢谢你";
    focusCopy.textContent = "谢谢你，陪小满重新走过这个夏天。";
    focusClose.hidden = true;
    focusComplete.hidden = true;
    return;
  }
  if (region === "height") {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
    closeRegion();
    return;
  }
  if (region === "mp3" && regionStates.mp3Completed && focusComplete.textContent === "关闭MP3") {
    closeRegion();
    return;
  }
  if (region === "bag" && regionStates.bag === "complete") {
    const closeSfx = shell.classList.contains("is-bag-recheck") ? bagCloseSfx : uiClickSfx;
    closeSfx.currentTime = 0;
    closeSfx.play().catch(() => {});
    closeRegion();
    return;
  }
  if (region === "drawer" && focusComplete.textContent === "关闭抽屉") {
    closeRegion();
    return;
  }
  if (region === "drawer" && regionStates.drawerPhotoSeen && focusComplete.textContent === "返回抽屉") {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
    regionStates.drawerFirstCompletion = true;
    drawerItemsPanel.hidden = false;
    drawerPhoto.hidden = false;
    focusCopy.textContent = "抽屉合上了，重要的回忆也都好好存着。";
    thought.hidden = false;
    thought.textContent = "抽屉已经整理好啦，看看房间还有什么没收拾。";
    focusComplete.textContent = "关闭抽屉";
    return;
  }
  if (region === "bag" && regionStates.bag === "closed") {
    bagOpenSfx.currentTime = 0;
    bagOpenSfx.play().catch(() => {});
    regionStates.bag = "open";
    bagObject.src = "素材/图片【移除背景】/书包_旧书包_打开_桌面.png";
    bagObject.alt = "打开的书包";
    modulePreview.hidden = true;
    focusTitle.textContent = "书包里的东西";
    focusCopy.textContent = "书包打开了，里面还有几样东西没有收好。";
    bagItemsPanel.hidden = false;
    document.querySelector("[data-focus-complete]").textContent = "继续查看";
    thought.textContent = "每一件物品都有一段故事，点击看看它们藏着什么回忆吧。";
    return;
  }
  if (region === "bag" && regionStates.bag === "open" && [...bagItems].every((item) => item.classList.contains("is-picked"))) {
    regionStates.bag = "complete";
    progressItems.forEach((item) => {
      if (item.dataset.region === region) item.classList.add("is-done");
    });
    bagObject.src = "素材/图片【移除背景】/书包_旧书包_完成_桌面.png";
    bagObject.alt = "收好的书包";
    focusComplete.textContent = "收好书包";
    focusComplete.disabled = false;
    focusClose.hidden = true;
    thought.textContent = completedStoryPrompt("bag");
    bagCloseSfx.currentTime = 0;
    bagCloseSfx.play().catch(() => {});
    closeRegion();
    return;
  }
  if (region === "computer") {
    if (regionStates.computer === "closed") {
      regionStates.computer = "open";
      computerModule.hidden = false;
      modulePreview.hidden = true;
      moduleImage.src = "素材/图片【移除背景】/电脑_旧电脑_开机_桌面.png";
      moduleImage.alt = "开机的旧电脑";
      focusCopy.textContent = "屏幕亮了，两个熟悉的小游戏还在等待。";
      document.querySelector("[data-focus-complete]").textContent = computerIsComplete() ? "关闭电脑" : "继续查看";
      return;
    }
    if (computerIsComplete()) {
      const closeSfx = shell.classList.contains("is-computer-recheck") || !regionStates.computerClosedOnce ? computerCloseSfx : uiClickSfx;
      closeSfx.currentTime = 0;
      closeSfx.play().catch(() => {});
    }
    computerModule.hidden = false;
    modulePreview.hidden = true;
    moduleImage.src = "素材/图片【移除背景】/电脑_旧电脑_开机_桌面.png";
    moduleImage.alt = "开机的旧电脑";
    focusCopy.textContent = "屏幕亮了，两个熟悉的小游戏还在等待。";
    if (!computerIsComplete()) {
      closeRegion();
      return;
    }
    progressItems.forEach((item) => {
      if (item.dataset.region === region) item.classList.add("is-done");
    });
    thought.textContent = completedStoryPrompt("computer");
    updateBoxLock();
    closeRegion();
    return;
  }
  if (region === "drawer" && regionStates.drawer === "closed") {
    regionStates.drawer = "open";
    drawerPullSfx.currentTime = 0;
    drawerPullSfx.play().catch(() => {});
    regionStates.drawerRecheck = false;
    roomScene.classList.add("is-drawer-open");
    modulePreview.hidden = true;
    moduleImage.removeAttribute("src");
    drawerItemsPanel.hidden = false;
    const drawerItemsComplete = [...drawerItems].every((item) => item.classList.contains("is-picked"));
    const drawerHasProgress = [...drawerItems].some((item) => item.classList.contains("is-picked"));
    thought.hidden = drawerHasProgress && !drawerItemsComplete;
    thought.textContent = drawerItemsComplete
      ? "抽屉底下好像还压着什么......"
      : "每一件物品都有一段故事，点击看看它们藏着什么回忆吧。";
    drawerPhoto.hidden = [...drawerItems].some((item) => !item.classList.contains("is-picked"));
    focusTitle.textContent = "书桌抽屉里的东西";
    focusCopy.textContent = "抽屉拉开了，里面还有几件老物件。";
    document.querySelector("[data-focus-complete]").textContent = "继续查看";
    return;
  }

function openNextDrawerItem() {
  const nextItem = [...drawerItems].find((item) => !item.classList.contains("is-picked"));
  nextItem?.click();
}

function openNextBoxItem() {
  const nextItem = [...boxItems].find((item) => !item.classList.contains("is-picked"));
  nextItem?.click();
}
  if (region === "box" && regionStates.box === "closed") {
    regionStates.box = "open";
    boxOpenSfx.currentTime = 0;
    boxOpenSfx.play().catch(() => {});
    boxObject.src = "素材/图片【移除背景】/纸箱_搬家纸箱_打开_桌面.png";
    boxObject.alt = "打开的搬家纸箱";
    modulePreview.hidden = true;
    moduleImage.removeAttribute("src");
    boxItemsPanel.hidden = false;
    thought.hidden = false;
    thought.textContent = "每一件物品都有一段故事，点击看看它们藏着什么回忆吧。";
    focusTitle.textContent = "纸箱里的东西";
    focusCopy.textContent = [...boxItems].every((entry) => entry.classList.contains("is-picked"))
      ? "纸箱收好了，这个夏天也被好好装起来了。"
      : "纸箱打开了，里面是搬家前最后要收好的东西。";
    document.querySelector("[data-focus-complete]").textContent = [...boxItems].every((item) => item.classList.contains("is-picked")) ? "收好纸箱" : "继续查看";
    if (regionStates.boxPhotoSeen) focusClose.hidden = true;
    return;
  }
  if (region === "mp3") {
    pauseRoomAudio();
    if (regionStates.mp3Started) {
      if (!regionStates.mp3Completed) thought.textContent = "这首歌一响起，那个夏天好像又回来了……";
      mp3ButtonSfx.currentTime = 0;
      mp3ButtonSfx.play().catch(() => {});
      mp3ProgrammaticToggle = true;
      if (mp3Audio.paused) mp3Audio.play();
      else mp3Audio.pause();
      setTimeout(() => { mp3ProgrammaticToggle = false; }, 0);
      return;
    }
    regionStates.mp3Started = true;
    mp3StartSfx.currentTime = 0;
    mp3StartSfx.play().catch(() => {});
    moduleImage.src = "素材/图片【移除背景】/MP3_MP3_播放_桌面.png";
    moduleImage.alt = "播放中的 MP3 播放器";
    modulePreview.hidden = false;
    mp3Player.hidden = false;
    focusCopy.textContent = "歌曲正在播放，可以继续听，也可以随时暂停。";
    thought.textContent = "这首歌一响起，那个夏天好像又回来了……";
    mp3Status.textContent = regionStates.mp3Completed ? "这段旋律，小满还想再听一会儿。" : "播放中……听到 30 秒后会记下这段回忆。";
    mp3Audio.play();
    return;
  }
  if (region === "bag" && [...bagItems].some((item) => !item.classList.contains("is-picked"))) {
    openNextBagItem();
    return;
  }
  if (region === "drawer" && [...drawerItems].some((item) => !item.classList.contains("is-picked"))) {
    openNextDrawerItem();
    return;
  }
  if (region === "drawer" && !regionStates.drawerPhotoSeen) {
    thought.textContent = "抽屉底下好像还压着什么……";
    drawerPhoto.classList.add("is-photo-hint");
    return;
  }
  if (region === "box") {
    if ([...boxItems].some((item) => !item.classList.contains("is-picked"))) {
      openNextBoxItem();
      return;
    }
  }
  progressItems.forEach((item) => {
    if (item.dataset.region === region) item.classList.add("is-done");
  });
  updateBoxLock();
  thought.textContent = `${regionNames[region]}先记下了，房间里还有别的东西。`;
  if (region === "bag") {
    bagObject.src = "素材/图片【移除背景】/书包_旧书包_完成_桌面.png";
    bagCloseSfx.currentTime = 0;
    bagCloseSfx.play().catch(() => {});
    bagObject.alt = "收好的书包";
  }
  if (region === "box") {
    boxObject.src = "素材/图片【移除背景】/纸箱_搬家纸箱_合上_桌面.png";
    const closeSfx = regionStates.boxFinishedPreview ? uiClickSfx : boxCloseSfx;
    closeSfx.currentTime = 0;
    closeSfx.play().catch(() => {});
    heightHotspot?.classList.remove("is-complete-hint");
  }
  closeRegion();
  if (region === "box" && regionStates.boxPhotoSeen && !activeRegionWasComplete) showFinalEnding();
});

endingReopen?.addEventListener("click", () => {
  uiClickSfx.currentTime = 0;
  uiClickSfx.play().catch(() => {});
  showFinalEnding();
});

mp3Audio.addEventListener("timeupdate", () => {
  if (!regionStates.mp3Completed && mp3Audio.currentTime >= MP3_COMPLETION_SECONDS) {
    regionStates.mp3Completed = true;
    progressItems.forEach((item) => {
      if (item.dataset.region === "mp3") item.classList.add("is-done");
    });
    updateBoxLock();
    mp3Status.textContent = "这段旋律，小满还想再听一会儿。";
    thought.textContent = "MP3也听完啦，看看房间还有什么没收拾。";
    focusComplete.textContent = "关闭MP3";
    focusClose.hidden = true;
  }
});

mp3Audio.addEventListener("play", () => {
  if (!mp3ProgrammaticToggle) {
    mp3ButtonSfx.currentTime = 0;
    mp3ButtonSfx.play().catch(() => {});
  }
  if (!(regionStates.mp3Completed && focusClose.hidden)) document.querySelector("[data-focus-complete]").textContent = "暂停播放";
});

mp3Audio.addEventListener("pause", () => {
  if (!mp3ProgrammaticToggle) {
    mp3ButtonSfx.currentTime = 0;
    mp3ButtonSfx.play().catch(() => {});
  }
  if (!(regionStates.mp3Completed && focusClose.hidden)) document.querySelector("[data-focus-complete]").textContent = "继续播放";
});

matchBoard?.addEventListener("click", (event) => {
  const card = event.target.closest("[data-match-id]");
  if (!card || regionStates.matchLocked || card.disabled || card.classList.contains("is-matched") || card === regionStates.matchFirst) return;
  computerClickSfx.currentTime = 0;
  computerClickSfx.play().catch(() => {});
  card.classList.add("is-flipped");
  if (!regionStates.matchFirst) {
    regionStates.matchFirst = card;
    return;
  }
  const first = regionStates.matchFirst;
  regionStates.matchFirst = null;
  if (first.dataset.matchId === card.dataset.matchId) {
    matchSuccessSfx.currentTime = 0;
    matchSuccessSfx.play().catch(() => {});
    first.classList.add("is-matched");
    card.classList.add("is-matched");
    first.disabled = true;
    card.disabled = true;
    regionStates.matchPairs += 1;
    matchStatus.textContent = regionStates.matchPairs === fruitAssets.length
      ? MATCH_COMPLETE_GUIDE
      : `配对成功，还剩 ${fruitAssets.length - regionStates.matchPairs} 对。`;
    if (regionStates.matchPairs === fruitAssets.length) {
      matchMemoryNote.hidden = false;
      matchHint.hidden = true;
    }
    finishComputerGames("match");
    updateComputerTabPrompt();
  } else {
    matchErrorSfx.currentTime = 0;
    matchErrorSfx.play().catch(() => {});
    regionStates.matchLocked = true;
    matchStatus.textContent = "不是同一种水果，再试试看。";
    window.setTimeout(() => {
      first.classList.remove("is-flipped");
      card.classList.remove("is-flipped");
      regionStates.matchLocked = false;
    }, 420);
  }
});

matchHint.addEventListener("click", () => {
  if (regionStates.matchHintUsed) {
    matchStatus.textContent = "提示已经用过了，剩下的自己找找看吧。";
    return;
  }
  matchHintSfx.currentTime = 0;
  matchHintSfx.play().catch(() => {});
  const available = [...matchBoard.querySelectorAll("[data-match-id]:not(.is-matched)")];
  const first = available[0];
  const second = available.find((card) => card.dataset.matchId === first?.dataset.matchId && card !== first);
  if (first && second) {
    regionStates.matchHintUsed = true;
    first.classList.add("is-flipped", "is-hint");
    second.classList.add("is-flipped", "is-hint");
    matchStatus.textContent = "这一对水果可以配在一起。";
    window.setTimeout(() => {
      first.classList.remove("is-flipped", "is-hint");
      second.classList.remove("is-flipped", "is-hint");
    }, 1100);
  }
});

document.querySelectorAll("[data-computer-app]").forEach((tab) => {
  tab.addEventListener("click", () => {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
    const app = tab.dataset.computerApp;
    computerActiveApp = app;
    updateComputerTabPrompt();
    focusCard.classList.toggle("is-match-complete", app === "match" && regionStates.matchPairs === fruitAssets.length && !computerIsComplete());
    document.querySelectorAll("[data-computer-app]").forEach((entry) => {
      entry.classList.toggle("is-active", entry === tab);
      entry.setAttribute("aria-selected", String(entry === tab));
    });
    document.querySelectorAll("[data-computer-panel]").forEach((panel) => { panel.hidden = panel.dataset.computerPanel !== app; });
    updateComputerThoughtForApp(app);
  });
});

farmPlots.forEach((plot) => {
  plot.addEventListener("click", () => {
    if (plot.classList.contains("is-complete") || plot.classList.contains("is-animating")) return;
    const action = plot.dataset.farmPlot;
    if (farmActionSfx[action]) { farmActionSfx[action].currentTime = 0; farmActionSfx[action].play().catch(() => {}); }
    const effect = plot.querySelector("[data-farm-effect]");
    const stateImage = plot.querySelector("[data-farm-state-image]");
    plot.classList.add("is-animating", `is-${action === "water" ? "watering" : action === "weed" ? "weeding" : "harvesting"}`);
    effect.hidden = false;
    window.setTimeout(() => {
      if (action === "water") {
        stateImage.src = "素材/图片【移除背景】/电脑_QQ农场_作物_浇水后_桌面.png";
        stateImage.alt = "已经浇水的作物";
      } else {
        stateImage.hidden = true;
      }
      plot.classList.remove("is-animating", "is-watering", "is-weeding", "is-harvesting");
      plot.classList.add("is-complete");
      plot.disabled = true;
      effect.hidden = true;
      farmCompletedPlots.add(plot.dataset.farmCoordinate);
      const remaining = farmPlots.length - farmCompletedPlots.size;
      farmStatus.textContent = remaining ? `还有 ${remaining} 块土地需要照料。` : "农田都照料好了，原来有人在偷偷帮你。";
      if (!remaining) {
        regionStates.farmMessageSeen = true;
        farmMessage.hidden = false;
        finishComputerGames("farm");
        updateComputerTabPrompt();
      }
    }, 1000);
  });
});

drawerItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    item.classList.add("is-picked");
    item.classList.add("is-interacting");
    const sfx = drawerSfx[item.dataset.drawerItem];
    if (sfx) {
      sfx.currentTime = 0;
      sfx.play().catch(() => {});
      if (item.dataset.drawerItem === "spinning-top") window.setTimeout(() => sfx.pause(), 3000);
      activeDrawerSfx = sfx;
    }
    window.setTimeout(() => item.classList.remove("is-interacting"), 650);
    item.setAttribute("aria-pressed", "true");
    const itemNames = { wrapper: "水晶糖纸", "fortune-teller": "东南西北", bubblegum: "比巴卜泡泡糖", comic: "爆笑校园", "spinning-top": "陀螺", marbles: "玻璃弹珠" };
    const drawerCopy = {
      wrapper: "一张亮晶晶的糖纸，被小心地收在抽屉里。",
      "fortune-teller": "折好的东南西北，里面藏着小时候的愿望。",
      bubblegum: "比巴卜泡泡糖，甜味好像还留在记忆里。",
      comic: "爆笑校园，翻开就能想起课间一起大笑的时光。",
      "spinning-top": "一只陀螺，曾经在桌面上转个不停。",
      marbles: "几颗玻璃弹珠，收着小时候赢来的小小得意。",
    };
    const drawerThought = {
      wrapper: "这张糖纸我还记得，舍不得扔掉。",
      "fortune-teller": "不知道现在再折一次，还会不会算出同样的答案。",
      bubblegum: "那时候一颗泡泡糖，就能开心好久。",
      comic: "原来我们笑得那么大声，连上课铃都听不见了。",
      "spinning-top": "它转起来的时候，周围总是围满了人。",
      marbles: "这些小玻璃球，我可是赢了好久才攒下来的。",
    };
    boxDialogImage.src = item.dataset.drawerItem === "fortune-teller"
      ? "素材/图片【移除背景】/抽屉_东南西北_展开_桌面.png"
      : item.dataset.drawerItem === "comic"
        ? "素材/图片【移除背景】/抽屉_爆笑校园_内页_桌面.webp"
        : item.dataset.drawerItem === "bubblegum"
          ? "素材/图片【移除背景】/泡泡糖.png"
        : item.querySelector("img").src;
    boxDialogImage.alt = item.querySelector("img").alt;
    boxDialogTitle.textContent = itemNames[item.dataset.drawerItem];
    boxDialogCopy.innerHTML = drawerCopy[item.dataset.drawerItem].replace(/，\s*/g, "，<br>");
    boxDialogThought.innerHTML = `“${drawerThought[item.dataset.drawerItem]}”`.replace(/，\s*/g, "，<br>");
    boxDialogClose.textContent = "返回抽屉";
    drawerItemsPanel.hidden = true;
    boxDetailDialog.hidden = false;
    focusCopy.textContent = "抽屉拉开了，里面还有几件老物件。";
    const remaining = [...drawerItems].filter((entry) => !entry.classList.contains("is-picked")).length;
    thought.hidden = true;
    thought.textContent = remaining ? `抽屉里还剩 ${remaining} 件东西。` : "抽屉底下露出了一张照片，点击合照看看...";
    if (!remaining) {
      drawerItemsPanel.hidden = true;
      drawerPhoto.hidden = false;
    }
  });
});

drawerPhoto.addEventListener("click", () => {
  drawerPhoto.classList.remove("is-photo-hint");
  regionStates.drawerPhotoSeen = true;
  progressItems.forEach((item) => {
    if (item.dataset.region === "drawer") item.classList.add("is-done");
  });
  thought.hidden = false;
  drawerPhoto.classList.add("is-picked");
  drawerItemsPanel.hidden = true;
  drawerPhoto.hidden = false;
  drawerPhoto.querySelector("span").textContent = "已查看这张合照";
  thought.textContent = "抽屉里只露出了一角……完整的合照，应该已经收进纸箱了。";
  focusComplete.textContent = "返回抽屉";
  focusClose.hidden = true;
});

boxItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (activeBoxSfx) { activeBoxSfx.pause(); activeBoxSfx.currentTime = 0; }
    const isPhoto = item.dataset.boxItem === "class-photo";
    const boxItemCopy = {
      notice: "实验中学报到通知：2015 年 8 月 31 日上午 8:30 报到。",
      key: "新家的钥匙，挂件也一起带上了。",
      "new-bag": "黑色双肩书包，准备装下新的课本和新故事。",
      uniform: "蓝白色运动校服，衣领内侧还藏着妈妈缝上的姓名贴。",
      "class-photo": "2015 年 6 月 · 六一班。大家都笑得很开心。",
    };
    const boxItemThought = {
      notice: "原来报到时间已经写好了，新的学校在等我。",
      key: "新家的钥匙，终于要交到我手里了。",
      "new-bag": "新书包大多了，肯定能装下新的课本。",
      uniform: "连姓名贴都缝好了，妈妈总是准备得很仔细。",
      "class-photo": "大家都在这里，原来这就是小学最后的合照。",
    };
    const otherItemsDone = [...boxItems].filter((entry) => entry !== item).every((entry) => entry.classList.contains("is-picked"));
    if (isPhoto && !otherItemsDone) {
      uiClickSfx.currentTime = 0;
      uiClickSfx.play().catch(() => {});
      thought.hidden = false;
      thought.textContent = "合照压在箱底，先看看其他几件东西。";
      return;
    }
    activeBoxSfx = boxSfx[item.dataset.boxItem];
    activeBoxSfx?.play().catch(() => {});
    if (!isPhoto) {
      thought.hidden = true;
      boxPhotoDetail.hidden = true;
      boxItemsPanel.hidden = true;
      item.classList.add("is-picked");
      item.setAttribute("aria-pressed", "true");
      if (shell.dataset.focusRegion === "box") focusCopy.textContent = "纸箱打开了，里面是搬家前最后要收好的东西。";
      boxDialogImage.src = item.dataset.boxItem === "uniform"
        ? "素材/图片【移除背景】/纸箱_实验中学校服_展开_桌面（带姓名贴）.png"
        : item.dataset.boxItem === "new-bag"
          ? "素材/图片【移除背景】/纸箱_黑色双肩书包_拉链微开_桌面.png"
          : item.querySelector("img").src;
      boxDialogImage.alt = item.querySelector("img").alt;
      boxDialogTitle.textContent = item.querySelector("span").textContent;
      boxDialogCopy.innerHTML = boxItemCopy[item.dataset.boxItem]
        .replace("实验中学报到通知：", "实验中学报到通知：<br>")
        .replace(/，\s*/g, "，<br>");
      boxDialogThought.innerHTML = `“${boxItemThought[item.dataset.boxItem]}”`.replace(/，\s*/g, "，<br>");
      boxDetailDialog.hidden = false;
      thought.hidden = true;
      thought.textContent = `${boxItemCopy[item.dataset.boxItem]}\n继续看看下一件。`;
      return;
    }
    boxItemDetail.hidden = true;
    boxPhotoDetail.hidden = false;
    boxItemsPanel.hidden = true;
    focusCopy.hidden = true;
    thought.hidden = true;
    regionStates.boxPhotoSide = "front";
    boxPhotoImage.src = "素材/图片【移除背景】/纸箱_全班合照_正面_桌面.webp";
    boxPhotoImage.alt = "全班合照正面";
    boxPhotoBackText.hidden = true;
    boxPhotoFlip.hidden = false;
    boxPhotoThought.textContent = "完整的合照终于找到了。\n诶，照片背后好像有字。";
    boxPhotoCaption.textContent = boxItemCopy["class-photo"];
  });
});

boxDialogClose.addEventListener("click", () => {
  if (shell.dataset.focusRegion === "bag") {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
  }
  if (shell.dataset.focusRegion === "drawer") {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
  }
  if (shell.dataset.focusRegion === "box") {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
  }
  if (activeBoxSfx) { activeBoxSfx.pause(); activeBoxSfx.currentTime = 0; }
  if (activeDrawerSfx) { activeDrawerSfx.pause(); activeDrawerSfx.currentTime = 0; }
  boxDetailDialog.hidden = true;
  if (shell.dataset.focusRegion === "drawer") {
    drawerItemsPanel.hidden = false;
    drawerPhoto.hidden = !regionStates.drawerRecheck && [...drawerItems].some((item) => !item.classList.contains("is-picked"));
    focusCopy.textContent = regionStates.drawerPhotoSeen
      ? "抽屉合上了，重要的回忆也都好好存着。"
      : "抽屉拉开了，里面还有几件老物件。";
    const drawerItemsComplete = [...drawerItems].every((item) => item.classList.contains("is-picked"));
    thought.hidden = !drawerItemsComplete;
    thought.textContent = drawerItemsComplete
      ? regionStates.drawerRecheck
        ? "抽屉已经整理好啦，看看房间还有什么没收拾。"
        : "抽屉底下好像还压着什么......"
      : "";
  } else if (shell.dataset.focusRegion === "box") {
    boxItemsPanel.hidden = false;
    focusCopy.hidden = false;
    focusCopy.textContent = [...boxItems].every((item) => item.classList.contains("is-picked"))
      ? "纸箱收好了，这个夏天也被好好装起来了。"
      : "纸箱打开了，里面是搬家前最后要收好的东西。";
    thought.hidden = !regionStates.boxPhotoSeen;
    thought.textContent = regionStates.boxPhotoSeen
      ? "纸箱也整理好啦，看看房间还有什么没收拾。"
      : DEFAULT_ROOM_GUIDE;
  } else if (shell.dataset.focusRegion === "bag") {
    bagItemsPanel.hidden = false;
    focusCopy.textContent = [...bagItems].every((item) => item.classList.contains("is-picked"))
      ? "拉链拉好了，重要的东西也都好好收着。"
      : "书包打开了，里面还有几样东西没有收好。";
    const bagItemsComplete = [...bagItems].every((item) => item.classList.contains("is-picked"));
    thought.hidden = !bagItemsComplete;
    thought.textContent = bagItemsComplete
      ? "书包已经整理好啦，看看房间还有什么没收拾。"
      : "每一件物品都有一段故事，点击看看它们藏着什么回忆吧。";
    boxDialogClose.textContent = "返回书包";
    return;
  }
  boxDialogClose.textContent = "返回纸箱";
});

boxDialogImage.addEventListener("click", () => {
  const activeSfx = shell.dataset.focusRegion === "box" ? activeBoxSfx : shell.dataset.focusRegion === "bag" ? activeBagSfx : activeDrawerSfx;
  if (activeSfx) {
    activeSfx.currentTime = 0;
    activeSfx.play().catch(() => {});
  }
});

boxPhotoFlip.addEventListener("click", () => {
  photoFlipSfx.currentTime = 0;
  photoFlipSfx.play().catch(() => {});
  if (regionStates.boxPhotoSide === "back") {
    regionStates.boxPhotoSide = "front";
    boxPhotoImage.src = "素材/图片【移除背景】/纸箱_全班合照_正面_桌面.webp";
    boxPhotoImage.alt = "全班合照正面";
    boxPhotoBackText.hidden = true;
    boxPhotoFlip.textContent = "翻看背面";
    boxPhotoThought.textContent = "完整的合照终于找到了。\n诶，照片背后好像有字。";
    return;
  }
  regionStates.boxPhotoSide = "back";
  boxPhotoImage.src = "素材/图片【移除背景】/纸箱_全班合照_背面_桌面.png";
  boxPhotoImage.alt = "全班合照背面";
  boxPhotoBackText.hidden = false;
  boxPhotoFlip.textContent = "翻看正面";
  boxPhotoCaption.textContent = "2015 年 6 月 · 六一班。大家都笑得很开心。";
  boxPhotoThought.textContent = "原来是我亲爱的同桌给我的惊喜！";
  const item = document.querySelector('[data-box-item="class-photo"]');
  item.classList.add("is-picked");
  item.setAttribute("aria-pressed", "true");
  regionStates.boxPhotoSeen = true;
  heightHotspot?.classList.remove("is-complete-hint");
  document.querySelector("[data-focus-complete]").textContent = "收好纸箱";
  focusClose.hidden = true;
});

boxPhotoClose.addEventListener("click", () => {
  if (shell.dataset.focusRegion === "box") {
    uiClickSfx.currentTime = 0;
    uiClickSfx.play().catch(() => {});
  }
  if (activeBoxSfx) { activeBoxSfx.pause(); activeBoxSfx.currentTime = 0; }
  boxPhotoDetail.hidden = true;
  if (shell.dataset.focusRegion === "drawer") {
    drawerItemsPanel.hidden = false;
    drawerPhoto.hidden = regionStates.drawerRecheck;
  } else {
    boxItemsPanel.hidden = false;
    focusCopy.hidden = false;
    focusCopy.textContent = "纸箱收好了，这个夏天也被好好装起来了。";
    thought.hidden = false;
    thought.textContent = "纸箱也整理好啦，看看房间还有什么没收拾。";
  }
});

bagItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.dataset.bagItem === "password-book" && !document.querySelector('[data-bag-item="desk-note"]').classList.contains("is-picked")) {
      thought.textContent = "密码本还打不开……先看看那张同桌留下的纸条。";
      return;
    }
    if (item.dataset.bagItem === "desk-note") {
      activeBagSfx = bagSfx[item.dataset.bagItem]; activeBagSfx.currentTime = 0; activeBagSfx.play().catch(() => {});
      item.classList.add("is-picked");
      item.setAttribute("aria-pressed", "true");
      boxDialogImage.src = "素材/图片【移除背景】/书包_同桌纸条_正面_桌面_带字.png";
      boxDialogImage.alt = "同桌纸条";
      boxDialogTitle.textContent = "同桌纸条";
      boxDialogCopy.innerHTML = "小满，别忘啦！<br><span class=\"desk-note-birthday\">10月25日，是你上初中以后的第一个生日。</span><br>说好了一起庆祝哦！<br>——你的同桌";
      boxDialogThought.textContent = "“说好了一起庆祝哦！”";
      boxDialogClose.textContent = "返回书包";
      bagItemsPanel.hidden = true;
      boxDetailDialog.hidden = false;
      noteDetail.hidden = true;
      thought.hidden = true;
      updateBagProgress();
      return;
    }
    noteDetail.hidden = item.dataset.bagItem !== "desk-note";
    passwordDetail.hidden = item.dataset.bagItem !== "password-book";
    if (item.dataset.bagItem !== "password-book") {
      item.classList.add("is-picked");
      item.setAttribute("aria-pressed", "true");
      activeBagSfx = bagSfx[item.dataset.bagItem]; activeBagSfx.currentTime = 0; activeBagSfx.play().catch(() => {});
      const bagItemCopy = {
        "red-scarf": "红领巾叠得整整齐齐，边角还留着每天佩戴的痕迹。",
        "school-card": "校牌上的照片还是一年级拍的，没想到这么快要说再见了。",
        badge: "当戴上中队长章，总是不由地昂首挺胸。",
        "pencil-case": "喜羊羊铅笔盒，里面装着陪我写完无数作业的铅笔。",
        dictionary: "新华字典，翻旧的页角还留着查字时的折痕。",
        "jump-rope": "跳绳卷在一起，想起了课间和同学一起跑出去的日子。",
      };
      const bagItemThought = {
        "red-scarf": "每天系好红领巾，就要出发去上学了。",
        "school-card": "那时候的校牌，也像一张小小的入场券。",
        badge: "我带着可威风了。",
        "pencil-case": "借出去又还回来的橡皮，比写过的字还多。",
        dictionary: "那时还会和同学比赛谁找到字更快。",
        "jump-rope": "下课铃一响，大家就会一起冲到操场上。",
      };
      const bagItemPreview = {
        "red-scarf": "素材/图片【移除背景】/书包_红领巾_展开_桌面.png",
        "school-card": "素材/图片【移除背景】/书包_校牌_正面_桌面.png",
        badge: "素材/图片【移除背景】/书包_大队长章_默认_桌面.png",
        "pencil-case": "素材/图片【移除背景】/书包_喜羊羊铅笔盒_打开_桌面.png",
        dictionary: "素材/图片【移除背景】/书包_新华字典_打开_桌面.png",
        "jump-rope": "素材/图片【移除背景】/书包_跳绳_展开_桌面.png",
      };
      boxDialogImage.src = bagItemPreview[item.dataset.bagItem] || item.querySelector("img").src;
      boxDialogImage.alt = item.querySelector("img").alt;
      boxDialogTitle.textContent = item.querySelector("span").textContent;
      boxDialogCopy.innerHTML = bagItemCopy[item.dataset.bagItem].replace(/，\s*/g, "，<br>");
      boxDialogThought.innerHTML = `“${bagItemThought[item.dataset.bagItem]}”`.replace(/，\s*/g, "，<br>");
      boxDialogClose.textContent = "返回书包";
      bagItemsPanel.hidden = true;
      boxDetailDialog.hidden = false;
      thought.hidden = true;
      updateBagProgress();
      return;
    }
    if (item.dataset.bagItem !== "password-book") {
      item.classList.add("is-picked");
      item.setAttribute("aria-pressed", "true");
      updateBagProgress();
    }
  });
});

document.querySelector("[data-password-submit]").addEventListener("click", () => {
  passwordButtonSfx.currentTime = 0;
  passwordButtonSfx.play().catch(() => {});
  if (passwordInput.value.trim() === "1025") {
    const passwordItem = document.querySelector('[data-bag-item="password-book"]');
    passwordItem.classList.add("is-picked");
    passwordItem.setAttribute("aria-pressed", "true");
    passwordFeedback.textContent = "密码对了，密码本打开了。";
    activeBagSfx = bagSfx["password-book"]; activeBagSfx.currentTime = 0; activeBagSfx.play().catch(() => {});
    boxDialogImage.src = "素材/图片【移除背景】/书包_密码本_打开_桌面.png";
    boxDialogImage.alt = "打开的密码本";
    boxDialogTitle.textContent = "密码本";
    boxDialogCopy.innerHTML = "密码本终于打开了，<br>里面记着那些只有自己知道的小秘密。";
    boxDialogThought.innerHTML = "“我会一直记得你们，我最亲爱的朋友们！”".replace(/，\s*/g, "，<br>");
    boxDialogClose.textContent = "返回书包";
    passwordDetail.hidden = true;
    bagItemsPanel.hidden = true;
    boxDetailDialog.hidden = false;
    thought.hidden = true;
    updateBagProgress();
  } else {
    passwordErrorSfx.currentTime = 0;
    passwordErrorSfx.play().catch(() => {});
    passwordFeedback.textContent = "好像不是这个日期，再看看纸条上的月份和日子。";
  }
});

passwordInput.addEventListener("input", () => {
  passwordButtonSfx.currentTime = 0;
  passwordButtonSfx.play().catch(() => {});
});

document.querySelector("[data-mute]").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const muted = !roomAudioMuted;
  roomAudioMuted = muted;
  button.classList.toggle("is-muted", muted);
  button.querySelector('[data-mute-icon="on"]').hidden = muted;
  button.querySelector('[data-mute-icon="off"]').hidden = !muted;
  button.setAttribute("aria-pressed", String(muted));
  button.setAttribute("aria-label", muted ? "有声" : "静音");
  button.title = muted ? "有声" : "静音";
  if (muted) pauseRoomAudio();
  else resumeRoomAudio();
});

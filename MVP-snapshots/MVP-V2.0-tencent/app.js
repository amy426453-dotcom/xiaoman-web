const actions = {
  collectPhoto: "收好照片",
  skipMemory: "这次先不放",
  returnRoom: "回房间看看",
  restartSummer: "再过一次夏天",
  putMemory: "把这段记忆放进去",
  close: "关闭",
  mute: "静音",
};

const status = document.querySelector("#status");

function updateStatus(message) {
  status.textContent = `刚刚选择了：${message}`;
}

function confirmRestart() {
  return window.confirm(
    "要重新回到这个夏夜吗？\n房间探索和小满物件的整理结果会重新开始，你的童年记忆卡会保留。",
  );
}

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    if (action === "restartSummer" && !confirmRestart()) {
      status.textContent = "已留在当前夏夜";
      return;
    }
    updateStatus(actions[action] ?? button.textContent.trim());
  });
});

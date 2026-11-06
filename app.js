(() => {
  const $ = (id) => document.getElementById(id);
  const { scenes, resolveEcho, buildEnding, serializeProgress, parseProgress } = window.MannersStory;
  const app = $("app");
  const world = $("world");
  const screens = {
    intro: $("introScreen"), story: $("storyScreen"), ending: $("endingScreen"), sources: $("sourcesScreen"),
  };



  const mbtiAxes = [
    { key: "EI", name: "E–I", label: "互動與整理", ends: ["E · 外向偏好", "I · 內向偏好"], prompt: "先和現場互動確認，或先在心裡整理，再選擇合適時機？" },
    { key: "SN", name: "S–N", label: "細節與可能", ends: ["S · 實感偏好", "N · 直覺偏好"], prompt: "先看見眼前的具體線索，或先連結整體模式與可能結果？" },
    { key: "TF", name: "T–F", label: "判斷時先看什麼", ends: ["T · 思考偏好", "F · 情感偏好"], prompt: "先檢查原則與一致性，或先衡量決定對人和價值的影響？" },
    { key: "JP", name: "J–P", label: "安排與彈性", ends: ["J · 判斷偏好", "P · 感知偏好"], prompt: "先把步驟安排清楚，或保留彈性、隨現場調整？" },
  ];

  const sourceGroups = [
    { title: "文化禮儀", icon: "⌂", note: "同一個座位安排會因主客、主人與文化場合不同而改變；手冊列出多種圓桌排法，並非一張通用座位表。", links: [
      ["外交部・有禮走天下：國際禮儀手冊", "https://multilingual.mofa.gov.tw/web/web_UTF-8/etiquette_201804/%E5%9C%8B%E9%9A%9B%E7%A6%AE%E5%84%80%E6%89%8B%E5%86%8A.pdf"],
    ] },
    { title: "職場洽公", icon: "☎", note: "把身分、目的和等待位置說清楚，也留出對方完成通話和當事人自己表達的空間。", links: [
      ["行政院人事行政總處・如何提升公務電話禮貌", "https://www.dgpa.gov.tw/Uploads/public/Attachment/57111535143.pdf"],
      ["內政部・會議規範（發言與會議秩序）", "https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvT2xkRmlsZS9jaXZpbF9sYXdfZmlsZS%2FmnIPorbDopo%2Fnr4QucGRm&n=5pyD6K2w6KaP56%2BELnBkZg%3D%3D"],
    ] },
    { title: "乘車與扶梯", icon: "↕", note: "先下後上是手冊明列的乘車原則；扶梯則依當地現行標示與安全提醒，不把「右立左行」當成處處相同的規則。", links: [
      ["外交部・國際禮儀手冊：大眾運輸與乘車禮儀", "https://multilingual.mofa.gov.tw/web/web_UTF-8/etiquette_201804/%E5%9C%8B%E9%9A%9B%E7%A6%AE%E5%84%80%E6%89%8B%E5%86%8A.pdf"],
      ["臺北捷運・握緊扶手、站穩踏階；電扶梯兩側皆可站立", "https://www.metro.taipei/News_Content.aspx?n=30CCEFD2A45592BF&s=60B20780FBCBC33A&sms=72544237BBE4C5F6"],
      ["臺北捷運系統旅客須知（電扶梯安全規範）", "https://web.metro.taipei/QRCode/Regulations%20for%20Use%20of%20the%20Taipei%20Metro%20System-Chinese.pdf?date=20260226"],
    ] },
    { title: "習慣與制度", icon: "↔", note: "排隊與通行不只關於個人，也受到社會習慣、設計與服務方式影響。", links: [
      ["台北市「排隊運動」分析（臺大）", "https://bp.ntu.edu.tw/001/Upload/1352/ckfile/b22fad7e-c91f-4e0c-8940-e7b8a5d2a19d.pdf"],
      ["A Theory of Social Custom, of Which Unemployment May Be One Consequence", "https://ideas.repec.org/a/oup/qjecon/v94y1980i4p749-775..html"],
      ["捷運月台旅客交織行為模式之研究（交通部運輸研究所）", "https://www.iot.gov.tw/zh_tw/archive/dissertation/dlist/-6317318"],
    ] },
    { title: "MBTI 偏好", icon: "◎", note: "MBTI 描述偏好，不是禮貌分數或行為定論；不同類型都能學習調整並做出體貼選擇。", links: [
      ["The Myers-Briggs Company・MBTI Facts（四組偏好與限制）", "https://www.themyersbriggs.com/en-US/Support/MBTI-Facts"],
      ["Myers & Briggs Foundation・MBTI Code of Ethics（避免貼標籤）", "https://www.myersbriggs.org/using-type-as-a-professional/mbti-code-of-ethics/"],
    ] },
    { title: "生活課程", icon: "✿", note: "國小一、二年級生活課程涵蓋家庭與公共生活中的互動；這裡借用體驗、探索與反思，不把選擇變成考題。", links: [
      ["國民小學暨國民中學課程綱要・生活課程（國教院）", "https://www.naer.edu.tw/upload/1/16/doc/813/(%E7%99%BC%E5%B8%83%E7%89%88)%E7%94%9F%E6%B4%BB%E8%AA%B2%E7%A8%8B%E8%AA%B2%E7%A8%8B%E7%B6%B1%E8%A6%81.pdf"],
    ] },
  ];



  let sceneIndex = 0;
  let choices = new Array(scenes.length).fill(null);
  let activeSourceIndex = 0;
  let activeMbtiAxis = 0;
  let screenName = "intro";
  let hasStarted = false;
  const progressKey = "you-have-manners-progress-v1";
  const audioPreferenceKey = "you-have-manners-audio-v1";
  let audioEnabled = false;
  let audioContext = null;

  try {
    audioEnabled = localStorage.getItem(audioPreferenceKey) === "1";
  } catch {
    audioEnabled = false;
  }
  updateAudioToggle();

  function updateAudioToggle() {
    const toggle = $("audioToggle");
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", audioEnabled ? "true" : "false");
    toggle.textContent = `提示音：${audioEnabled ? "開" : "關"}`;
  }

  function playCue(kind) {
    if (!audioEnabled) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      audioContext ||= new AudioContextClass();
      if (audioContext.state === "suspended") void audioContext.resume();
      const now = audioContext.currentTime;
      const notes = kind === "choice" ? [523.25] : [392, 523.25];
      notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const start = now + index * .12;
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(.035, start + .035);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + .34);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(start);
        oscillator.stop(start + .36);
      });
    } catch {
      // Audio is optional; unsupported or unavailable audio never blocks the story.
    }
  }

  function readProgress() {
    try {
      const raw = localStorage.getItem(progressKey);
      if (!raw) return null;
      return parseProgress(raw, {
        sceneCount: scenes.length,
        choiceCounts: scenes.map((scene) => scene.choices.length),
        sourceCount: sourceGroups.length,
        validScreens: ["story", "ending", "sources"],
      });
    } catch {
      return null;
    }
  }

  function persistProgress() {
    try {
      if (!hasStarted || screenName === "intro") {
        localStorage.removeItem(progressKey);
        return;
      }
      localStorage.setItem(progressKey, serializeProgress({
        version: 1,
        screen: screenName,
        sceneIndex,
        choices,
        activeSourceIndex,
      }));
    } catch {
      // Progress is a convenience; the story remains playable if storage is unavailable.
    }
  }

  const savedProgress = readProgress();
  if (savedProgress) {
    sceneIndex = savedProgress.sceneIndex;
    choices = savedProgress.choices;
    activeSourceIndex = savedProgress.activeSourceIndex;
    screenName = savedProgress.screen;
    hasStarted = true;
  }

  function setScreen(name) {
    screenName = name;
    Object.entries(screens).forEach(([key, node]) => {
      const active = key === name;
      node.hidden = !active;
      node.classList.toggle("is-active", active);
    });
    app.dataset.screen = name;
    $("restartTop").hidden = name === "intro";
    const labels = { intro: "一段日常・一個選擇", story: "沿著日常，慢慢往前", ending: "故事的其中一種結尾", sources: "故事之外・一起想想" };
    $("chapterLabel").textContent = labels[name];
    persistProgress();
  }

  function setPanorama(index) {
    const positions = ["0%", "42%", "53%", "72%", "100%", "100%"];
    world.style.backgroundPosition = `${positions[index]} center`;
  }

  function renderDots() {
    const root = $("sceneDots");
    root.innerHTML = "";
    scenes.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `scene-dot${i === sceneIndex ? " is-current" : ""}${i < sceneIndex ? " is-past" : ""}`;
      dot.setAttribute("aria-label", `前往第 ${i + 1} 幕`);
      dot.setAttribute("aria-current", i === sceneIndex ? "step" : "false");
      dot.disabled = i > sceneIndex;
      dot.addEventListener("click", () => { if (i < sceneIndex) goToScene(i); });
      root.append(dot);
    });
  }

  function renderScene() {
    const scene = scenes[sceneIndex];
    setPanorama(sceneIndex);
    $("sceneTotal").textContent = String(scenes.length).padStart(2, "0");
    $("sceneNumber").textContent = String(sceneIndex + 1).padStart(2, "0");
    $("scenePlace").textContent = scene.place;
    $("sceneTime").textContent = scene.time;
    $("eventStep").textContent = `${sceneIndex + 1} / ${scenes.length}`;
    $("eventTag").textContent = scene.tag;
    $("peopleCue").querySelector("#cueText").textContent = scene.cue;
    $("eventTitle").textContent = scene.title;
    $("eventBody").textContent = scene.body;
    $("consensusLabel").textContent = scene.consensusLabel;
    $("consensusText").textContent = scene.consensusText;
    $("consensusNote").dataset.kind = scene.consensusKind;
    $("eventPrompt").textContent = scene.prompt;
    $("journeyFill").style.width = `${((sceneIndex + 1) / scenes.length) * 100}%`;
    const currentChoice = choices[sceneIndex];
    $("eventCard").classList.toggle("has-choice", currentChoice !== null);
    const list = $("choiceList");
    list.innerHTML = "";
    scene.choices.forEach((choice, index) => {
      if (currentChoice !== null && index !== currentChoice) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = `choice-button${currentChoice === index ? " selected" : ""}`;
      button.setAttribute("aria-pressed", currentChoice === index ? "true" : "false");
      button.disabled = currentChoice !== null;
      const label = document.createElement("span");
      label.textContent = choice.text;
      const arrow = document.createElement("span");
      arrow.className = "choice-arrow";
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = currentChoice === index ? "✓" : "→";
      button.append(label, arrow);
      button.addEventListener("click", () => selectChoice(index));
      list.append(button);
    });
    if (currentChoice !== null) {
      const change = document.createElement("button");
      change.type = "button";
      change.className = "change-choice";
      change.textContent = "重新看看其他選擇";
      change.addEventListener("click", () => {
        choices[sceneIndex] = null;
        renderScene();
        persistProgress();
        $(`choiceList`).querySelector("button")?.focus({ preventScroll: true });
      });
      list.append(change);
    }
    const echo = $("echoPanel");
    echo.hidden = currentChoice === null;
    if (currentChoice !== null) {
      $("echoText").textContent = resolveEcho(sceneIndex, currentChoice, choices);
      $("continueButton").innerHTML = sceneIndex === scenes.length - 1 ? "看看故事的其中一種結尾 <span aria-hidden=\"true\">→</span>" : "把這一刻帶上 <span aria-hidden=\"true\">→</span>";
    }
    $("backButton").disabled = sceneIndex === 0;
    $("backButton").style.opacity = sceneIndex === 0 ? ".38" : "1";
    renderDots();
  }

  function goToScene(index) {
    const nextIndex = Math.max(0, Math.min(scenes.length - 1, index));
    const changedScene = screenName !== "story" || nextIndex !== sceneIndex;
    sceneIndex = nextIndex;
    renderScene();
    setScreen("story");
    if (changedScene) playCue("scene");
    $("eventTitle").focus({ preventScroll: true });
  }

  function selectChoice(index) {
    choices[sceneIndex] = index;
    renderScene();
    persistProgress();
    playCue("choice");
    const next = $("continueButton");
    next.focus({ preventScroll: true });
  }

  function showEnding() {
    const ending = buildEnding(choices);
    $("endingTitle").textContent = ending.title;
    $("endingCopy").textContent = ending.copy;
    $("endingMemory").textContent = ending.memory;
    setScreen("ending");
    $("endingTitle").focus({ preventScroll: true });
  }

  function continueStory() {
    if (choices[sceneIndex] === null) return;
    if (sceneIndex === scenes.length - 1) showEnding();
    else goToScene(sceneIndex + 1);
  }

  function buildSources() {
    const tabs = $("sourceTabs");
    tabs.innerHTML = "";
    sourceGroups.forEach((group, index) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "source-tab";
      tab.id = `sourceTab${index}`;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "sourcePanel");
      tab.setAttribute("aria-selected", index === activeSourceIndex ? "true" : "false");
      tab.tabIndex = index === activeSourceIndex ? 0 : -1;
      tab.textContent = group.title;
      tab.addEventListener("click", () => showSourceGroup(index));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? sourceGroups.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : sourceGroups.length - 1)) % sourceGroups.length;
        showSourceGroup(next);
        $(`sourceTab${next}`).focus();
      });
      tabs.append(tab);
    });
    renderSourceGroup();
  }

  function showSourceGroup(index) {
    activeSourceIndex = index;
    sourceGroups.forEach((_, i) => {
      const tab = $(`sourceTab${i}`);
      tab.setAttribute("aria-selected", i === index ? "true" : "false");
      tab.tabIndex = i === index ? 0 : -1;
    });
    renderSourceGroup();
    persistProgress();
  }

  function renderSourceGroup() {
    const group = sourceGroups[activeSourceIndex];
    const panel = $("sourcePanel");
    panel.innerHTML = "";
    panel.scrollTop = 0;
    panel.setAttribute("aria-labelledby", `sourceTab${activeSourceIndex}`);
    const section = document.createElement("div");
    section.className = "source-group";
    const heading = document.createElement("h3");
    const icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = group.icon;
    heading.append(icon, document.createTextNode(group.title));
    section.append(heading);
    group.links.forEach(([label, href]) => {
      const link = document.createElement("a");
      link.className = "source-link";
      link.href = href;
      link.target = "_blank";
      link.rel = "noreferrer";
      const name = document.createElement("span");
      name.textContent = label;
      const out = document.createElement("span");
      out.className = "out";
      out.setAttribute("aria-hidden", "true");
      out.textContent = "↗";
      link.append(name, out);
      section.append(link);
    });
    const note = document.createElement("p");
    note.className = "source-note";
    note.textContent = group.note;
    section.append(note);
    panel.append(section);
  }

  function buildMbtiTabs() {
    const root = $("mbtiTabs");
    root.innerHTML = "";
    mbtiAxes.forEach((axis, index) => {
      const tab = document.createElement("button");
      tab.type = "button";
      tab.className = "mbti-tab";
      tab.id = `mbtiTab${index}`;
      tab.setAttribute("role", "tab");
      tab.setAttribute("aria-controls", "mbtiAxisPanel");
      tab.setAttribute("aria-selected", index === activeMbtiAxis ? "true" : "false");
      tab.tabIndex = index === activeMbtiAxis ? 0 : -1;
      tab.textContent = axis.name;
      tab.addEventListener("click", () => showMbtiAxis(index));
      tab.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? mbtiAxes.length - 1
          : (index + (event.key === "ArrowRight" ? 1 : mbtiAxes.length - 1)) % mbtiAxes.length;
        showMbtiAxis(next);
        $(`mbtiTab${next}`).focus();
      });
      root.append(tab);
    });
    renderMbtiAxis();
  }

  function showMbtiAxis(index) {
    activeMbtiAxis = index;
    mbtiAxes.forEach((_, i) => {
      const tab = $(`mbtiTab${i}`);
      tab.setAttribute("aria-selected", i === index ? "true" : "false");
      tab.tabIndex = i === index ? 0 : -1;
    });
    renderMbtiAxis();
  }

  function renderMbtiAxis() {
    const scene = scenes[sceneIndex];
    const axis = mbtiAxes[activeMbtiAxis];
    const panel = $("mbtiAxisPanel");
    panel.innerHTML = "";
    panel.setAttribute("aria-labelledby", `mbtiTab${activeMbtiAxis}`);
    const heading = document.createElement("h3");
    heading.textContent = axis.label;
    const prompt = document.createElement("p");
    prompt.className = "axis-prompt";
    prompt.textContent = axis.prompt;
    const examples = document.createElement("div");
    examples.className = "axis-examples";
    scene.mbti[axis.key].forEach((example, index) => {
      const card = document.createElement("div");
      card.className = "axis-example";
      const label = document.createElement("b");
      label.textContent = axis.ends[index];
      const text = document.createElement("p");
      text.textContent = example;
      card.append(label, text);
      examples.append(card);
    });
    panel.append(heading, prompt, examples);
  }

  function restart() {
    choices = new Array(scenes.length).fill(null);
    sceneIndex = 0;
    hasStarted = false;
    setPanorama(0);
    setScreen("intro");
    $("startButton").focus({ preventScroll: true });
  }

  $("startButton").addEventListener("click", () => { hasStarted = true; goToScene(0); });
  $("continueButton").addEventListener("click", continueStory);
  $("backButton").addEventListener("click", () => { if (sceneIndex > 0) goToScene(sceneIndex - 1); });
  $("sourcesButton").addEventListener("click", () => {
    setScreen("sources");
    $("sourcesTitle").focus({ preventScroll: true });
  });
  $("endingReplay").addEventListener("click", restart);
  $("sourcesReplay").addEventListener("click", restart);
  $("restartTop").addEventListener("click", restart);
  $("audioToggle").addEventListener("click", () => {
    audioEnabled = !audioEnabled;
    try {
      if (audioEnabled) localStorage.setItem(audioPreferenceKey, "1");
      else localStorage.removeItem(audioPreferenceKey);
    } catch {
      // Audio still works for this visit when preferences cannot be stored.
    }
    updateAudioToggle();
    if (audioEnabled) playCue("scene");
  });
  $("mbtiOpen").addEventListener("click", () => {
    renderMbtiAxis();
    $("mbtiDialog").showModal();
    $(`mbtiTab${activeMbtiAxis}`).focus({ preventScroll: true });
  });
  $("mbtiClose").addEventListener("click", () => $("mbtiDialog").close());
  $("mbtiReturn").addEventListener("click", () => $("mbtiDialog").close());
  buildSources();
  buildMbtiTabs();
  if (!savedProgress) {
    setScreen("intro");
    setPanorama(0);
  } else {
    renderScene();
    setPanorama(sceneIndex);
    if (screenName === "ending") showEnding();
    else {
      setScreen(screenName);
      if (screenName === "story") $("eventTitle").focus({ preventScroll: true });
      else $("sourcesTitle").focus({ preventScroll: true });
    }
  }
})();

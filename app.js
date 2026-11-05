(() => {
  const $ = (id) => document.getElementById(id);
  const app = $("app");
  const world = $("world");
  const screens = {
    intro: $("introScreen"), story: $("storyScreen"), ending: $("endingScreen"), sources: $("sourcesScreen"),
  };

  const scenes = [
    {
      place: "家裡・晚餐前", time: "17:42", tag: "餐桌邊的小停頓", cue: "奶奶把一句話說到一半，桌上忽然安靜了。",
      title: "「我今天在市場……」奶奶停了一下。",
      body: "你正想分享學校裡的新鮮事，奶奶的故事也才剛開始。窗外雨聲滴答，大家的晚餐都還熱著。",
      prompt: "如果你在這張餐桌旁，會怎麼讓這段對話繼續？",
      choices: [
        { text: "先聽奶奶把故事說完，等一個自然的空檔再分享。", type: "room", echo: "奶奶把市場裡那隻迷路的小狗說完了。你的故事也沒有消失，只是多等了一會兒；晚餐桌多了一個可以接住彼此的空檔。" },
        { text: "輕聲說「我也有一件事想分享」，看看能不能輪流說。", type: "voice", echo: "你把想說的話留在桌上，也把話題遞給奶奶。輪流不是誰先誰後的規定，而是兩個人的故事都有位置。" },
        { text: "先把話吞回去，讓大家安靜吃飯。", type: "voice", echo: "餐桌安靜下來了，但你的故事也暫時留在心裡。下次或許可以試著說出需要：安靜一會兒，或一起輪流聊聊。" },
      ],
    },
    {
      place: "公寓門口・雨剛停", time: "17:51", tag: "門口的一點距離", cue: "門快要闔上時，身後傳來急急的腳步聲。",
      title: "門外的人，手裡抱著一箱東西。",
      body: "你按住電梯開門鍵。對方看起來有些著急，卻也不一定希望你替他決定。電梯裡還有另一位鄰居。",
      prompt: "幫忙的心意，怎麼做才也替對方留了選擇？",
      choices: [
        { text: "看著對方問：「需要幫你按一下嗎？」", type: "room", echo: "對方點點頭。那句詢問讓善意先敲門，而不是直接替別人作主；另一位鄰居也往旁邊挪出一點位置。" },
        { text: "按住開門鍵，讓對方自己決定要不要進來。", type: "room", echo: "對方趕上電梯，和你點頭致意。你沒有催促，也沒替他選擇；有時候，留一扇門就是剛好的幫忙。" },
        { text: "先問一句：「我們還有空間嗎？」再一起挪挪看。", type: "question", echo: "大家一起挪了挪包包，才發現不必讓誰勉強縮在角落。空間不是固定的；一起商量，也是一種照顧。" },
      ],
    },
    {
      place: "公車站・下一班快到了", time: "18:03", tag: "站牌旁的隊伍", cue: "車燈從轉角亮起，站牌旁的人群開始移動。",
      title: "隊伍有點歪，也有人剛走到站牌。",
      body: "雨傘滴著水，老人家站在靠近路口的位置。大家都想上車，也有人不太確定隊伍從哪裡開始。",
      prompt: "當規矩不夠清楚，先問、先讓，或一起把位置說明白？",
      choices: [
        { text: "指指隊尾說：「我們從這裡排，要不要一起等？」", type: "room", echo: "新來的人順著你的手勢站好，老人家也有了比較穩的位置。小小的說明讓「排隊」不必靠猜，還讓大家更容易互相看見。" },
        { text: "先問大家：「這裡是隊伍的最後面嗎？」", type: "question", echo: "旁邊的人一起確認，才發現隊伍其實分成了兩小段。有人提議靠站牌排成一列——不是誰被糾正，而是大家把模糊的地方談清楚。" },
        { text: "怕錯過車，先往前一步，邊走邊看大家怎麼排。", type: "voice", echo: "你擠到前面了，也看見身後有人皺起眉頭。著急是真的；也許下一次可以直接問清楚，讓自己的時間和別人的等待都被放進考量。" },
      ],
    },
    {
      place: "街角・社區小店", time: "18:16", tag: "每個人都想說的話", cue: "店裡的桌子不大，話題卻一下子變多了。",
      title: "店員正接電話，隔壁桌也在討論。",
      body: "一位鄰居想問店員事情，電話那頭還沒說完；你和朋友也正討論要不要把門口的傘架移開，讓輪椅更好通過。",
      prompt: "當好幾個人的需要同時出現，怎麼找到下一步？",
      choices: [
        { text: "等店員結束通話，再問能不能一起看看門口的空間。", type: "room", echo: "電話那端先被好好聽完。接著幾個人走到門口一起挪傘架，也確認輪椅轉身是否真的更方便。等待沒有解決一切，但讓討論有了入口。" },
        { text: "直接提醒：「門口這裡好像不太好通過，我們能一起調整嗎？」", type: "question", echo: "你說得清楚，也把「一起」留在句子裡。店員結束通話後加入，大家試了兩個位置，最後找到更順的動線。好意變成改變，還需要聽見真正使用空間的人。" },
        { text: "先和朋友談好，等有空再找店員討論。", type: "voice", echo: "你們先把想法記下來，沒有在電話中途打斷。離開前，朋友提議下次帶一張簡單的動線草圖，讓關心有機會接上行動。" },
      ],
    },
  ];

  const sourceGroups = [
    { title: "日常裡的禮貌", icon: "⌂", note: "禮貌不是一張固定清單；不同情境、文化與關係都值得再問一次。", links: [
      ["有禮走天下・國際禮儀手冊", "https://multilingual.mofa.gov.tw/web/web_UTF-8/etiquette_201804/%E5%9C%8B%E9%9A%9B%E7%A6%AE%E5%84%80%E6%89%8B%E5%86%8A.pdf"],
      ["如何提升公務電話禮貌", "https://www.dgpa.gov.tw/Uploads/public/Attachment/57111535143.pdf"],
      ["會議規範（內政部）", "https://ws.moi.gov.tw/Download.ashx?u=LzAwMS9VcGxvYWQvT2xkRmlsZS9jaXZpbF9sYXdfZmlsZS%2FmnIPorbDopo%2Fnr4QucGRm&n=5pyD6K2w6KaP56%2BELnBkZg%3D%3D"],
    ] },
    { title: "規矩與社會習慣", icon: "↔", note: "排隊也牽涉制度、服務與空間，不只是個人品格。", links: [
      ["台北市「排隊運動」分析（臺大）", "https://bp.ntu.edu.tw/001/Upload/1352/ckfile/b22fad7e-c91f-4e0c-8940-e7b8a5d2a19d.pdf"],
      ["A Theory of Social Custom, of Which Unemployment May Be One Consequence", "https://ideas.repec.org/a/oup/qjecon/v94y1980i4p749-775..html"],
    ] },
    { title: "公共空間怎麼設計", icon: "⌁", note: "人流相遇、設施位置與尖峰擁擠，也會改變大家的選擇。", links: [
      ["捷運月台旅客交織行為模式之研究（交通部運輸研究所）", "https://www.iot.gov.tw/zh_tw/archive/dissertation/dlist/-6317318"],
    ] },
    { title: "從生活裡學習", icon: "✿", note: "國小一、二年級生活課程涵蓋家庭與公共生活中的互動；這裡借用體驗、探索與反思，不把選擇變成考題。", links: [
      ["國民小學暨國民中學課程綱要・生活課程（國教院）", "https://www.naer.edu.tw/upload/1/16/doc/813/(%E7%99%BC%E5%B8%83%E7%89%88)%E7%94%9F%E6%B4%BB%E8%AA%B2%E7%A8%8B%E8%AA%B2%E7%A8%8B%E7%B6%B1%E8%A6%81.pdf"],
    ] },
  ];

  const endings = {
    room: { title: "你替彼此，留了一點空間。", copy: "你注意到等待、讓路與照顧別人的細節。這種選擇讓相處變得柔軟；也別忘了，空間要被看見，才有辦法一起調整。", memory: "這條路的線索：先看見別人，再把位置留出來。" },
    voice: { title: "你讓自己的聲音，也留在故事裡。", copy: "你記得自己也有時間、想法和需要。把需要說出來，並不會取消禮貌；說法與時機，可能讓彼此更有機會聽懂。", memory: "這條路的線索：關係裡不只需要體諒，也需要清楚表達。" },
    question: { title: "你把「為什麼」變成了一起商量。", copy: "你看見規則不一定清楚，空間也不一定公平。問一問、試一試，能讓禮貌不只是要求每個人配合，也成為共同改善日常的開始。", memory: "這條路的線索：有時候最友善的事，是一起把規則變得更好。" },
  };

  let sceneIndex = 0;
  let choices = new Array(scenes.length).fill(null);
  let activeSourceIndex = 0;
  let toastTimer;

  function setScreen(name) {
    Object.entries(screens).forEach(([key, node]) => {
      const active = key === name;
      node.hidden = !active;
      node.classList.toggle("is-active", active);
    });
    app.dataset.screen = name;
    $("restartTop").hidden = name === "intro";
    const labels = { intro: "一段日常・一個選擇", story: "沿著日常，慢慢往前", ending: "故事的其中一種結尾", sources: "故事之外・一起想想" };
    $("chapterLabel").textContent = labels[name];
  }

  function setPanorama(index) {
    const positions = ["0%", "23%", "61%", "100%"];
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
    $("sceneNumber").textContent = String(sceneIndex + 1).padStart(2, "0");
    $("scenePlace").textContent = scene.place;
    $("sceneTime").textContent = scene.time;
    $("eventStep").textContent = `${sceneIndex + 1} / ${scenes.length}`;
    $("eventTag").textContent = scene.tag;
    $("peopleCue").querySelector("#cueText").textContent = scene.cue;
    $("eventTitle").textContent = scene.title;
    $("eventBody").textContent = scene.body;
    $("eventPrompt").textContent = scene.prompt;
    $("journeyFill").style.width = `${((sceneIndex + 1) / scenes.length) * 100}%`;
    const currentChoice = choices[sceneIndex];
    const list = $("choiceList");
    list.innerHTML = "";
    scene.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `choice-button${currentChoice === index ? " selected" : ""}`;
      button.setAttribute("aria-pressed", currentChoice === index ? "true" : "false");
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
    const echo = $("echoPanel");
    echo.hidden = currentChoice === null;
    if (currentChoice !== null) {
      $("echoText").textContent = scene.choices[currentChoice].echo;
      $("continueButton").innerHTML = sceneIndex === scenes.length - 1 ? "看看故事的其中一種結尾 <span aria-hidden=\"true\">→</span>" : "把這一刻帶上 <span aria-hidden=\"true\">→</span>";
    }
    $("backButton").disabled = sceneIndex === 0;
    $("backButton").style.opacity = sceneIndex === 0 ? ".38" : "1";
    renderDots();
  }

  function goToScene(index) {
    sceneIndex = Math.max(0, Math.min(scenes.length - 1, index));
    renderScene();
    setScreen("story");
  }

  function selectChoice(index) {
    choices[sceneIndex] = index;
    renderScene();
    const next = $("continueButton");
    next.focus({ preventScroll: true });
  }

  function getEndingKey() {
    const counts = { room: 0, voice: 0, question: 0 };
    let lastType = "room";
    choices.forEach((choice, i) => {
      if (choice === null) return;
      lastType = scenes[i].choices[choice].type;
      counts[lastType] += 1;
    });
    const max = Math.max(...Object.values(counts));
    const leaders = Object.keys(counts).filter((key) => counts[key] === max);
    return leaders.includes(lastType) ? lastType : leaders[0];
  }

  function showEnding() {
    const ending = endings[getEndingKey()];
    $("endingTitle").textContent = ending.title;
    $("endingCopy").textContent = ending.copy;
    const selectedCount = choices.filter((value) => value !== null).length;
    const memoryText = selectedCount === scenes.length
      ? `這次旅程裡，你做了 ${selectedCount} 個選擇。沒有分數，也沒有被判定的好壞；回頭看看，哪一個瞬間最讓你停下來？`
      : "每條路都只是一種可能。換個選擇，故事也會長出新的樣子。";
    $("endingMemory").textContent = `${ending.memory} ${memoryText}`;
    setScreen("ending");
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
  }

  function renderSourceGroup() {
    const group = sourceGroups[activeSourceIndex];
    const panel = $("sourcePanel");
    panel.innerHTML = "";
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

  function restart() {
    choices = new Array(scenes.length).fill(null);
    sceneIndex = 0;
    setPanorama(0);
    setScreen("intro");
    $("startButton").focus({ preventScroll: true });
  }

  $("startButton").addEventListener("click", () => { goToScene(0); $("eventTitle").focus?.({ preventScroll: true }); });
  $("continueButton").addEventListener("click", continueStory);
  $("backButton").addEventListener("click", () => { if (sceneIndex > 0) goToScene(sceneIndex - 1); });
  $("sourcesButton").addEventListener("click", () => setScreen("sources"));
  $("endingReplay").addEventListener("click", restart);
  $("sourcesReplay").addEventListener("click", restart);
  $("restartTop").addEventListener("click", restart);
  buildSources();
  setScreen("intro");
  setPanorama(0);
})();

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
      consensusLabel: "一起商量", consensusKind: "context", consensusText: "輪流說話很有幫助；誰先說、想安靜一下，也可以說出來再協調。",
      title: "「我今天在市場……」奶奶停了一下。",
      body: "你正想分享學校裡的新鮮事，奶奶的故事也才剛開始。窗外雨聲滴答，大家的晚餐都還熱著。",
      prompt: "如果你在這張餐桌旁，會怎麼讓每個人的故事都有位置？",
      mbti: {
        EI: ["可能先把想法說出來，邀請大家輪流聊。", "可能先聽完、想一想，再找舒服的空檔分享。"],
        SN: ["可能注意奶奶停頓的語氣和桌上的對話細節。", "可能先想到怎麼讓不同故事接在一起。"],
        TF: ["可能先留意每個人是否都有輪到說話。", "可能先感覺到奶奶或自己現在的心情。"],
        JP: ["可能想先約好一人說一段、依序分享。", "可能讓話題跟著當下自然流動。"],
      },
      choices: [
        { text: "先聽奶奶把故事說完，等一個自然的空檔再分享。", type: "room", echo: "奶奶把市場裡那隻迷路的小狗說完了。你的故事也沒有消失，只是多等了一會兒；晚餐桌多了一個可以接住彼此的空檔。" },
        { text: "輕聲說「我也有一件事想分享」，看看能不能輪流說。", type: "voice", echo: "你把想說的話留在桌上，也把話題遞給奶奶。輪流不是誰先誰後的規定，而是兩個人的故事都有位置。" },
        { text: "先把話吞回去，讓大家安靜吃飯。", type: "voice", echo: "餐桌安靜下來了，但你的故事也暫時留在心裡。下次或許可以試著說出需要：安靜一會兒，或一起輪流聊聊。" },
      ],
    },
    {
      place: "捷運月台・下班時段", time: "17:54", tag: "車門打開的那一刻", cue: "人群往前一步，車廂裡還有人正要下車。",
      consensusLabel: "較明確的共識", consensusKind: "shared", consensusText: "搭乘大眾運輸先下後上，並留出門口通道；同行長輩也可以先問他想怎麼走。",
      title: "阿嬤說：「你先上車，我跟著就好。」",
      body: "你陪阿嬤去洽公，手上拿著文件。列車停靠後，門口幾位乘客還在下車，旁邊也有推車乘客等著通過。",
      prompt: "先下後上是清楚的共識；怎麼一起做到，又不替同行者作主？",
      mbti: {
        EI: ["可能先提醒大家「讓車廂裡的人先下車」。", "可能先觀察門口和同行者的位置，再輕聲確認。"],
        SN: ["可能先看車門、隊伍、推車和可通行的空隙。", "可能先想整段人流怎麼走才不互相卡住。"],
        TF: ["可能先確認流程對前後乘客是否一致公平。", "可能先注意阿嬤是否自在、推車乘客是否需要空間。"],
        JP: ["可能先排好隊、等人下完再一起上車。", "可能依車廂和人流變化，彈性調整同行位置。"],
      },
      choices: [
        { text: "站在門旁留出通道，等乘客下完，再問阿嬤要不要你陪她上車。", type: "room", echo: "乘客順利下車，你和阿嬤也一起上了車。你沒有把「照顧長輩」變成替她決定，而是先遵守通行共識，再問她需要什麼。" },
        { text: "先擠上車幫阿嬤佔位置，想說這樣比較照顧她。", type: "voice", echo: "你很想確保阿嬤有位置，卻讓下車的人得繞開你。照顧的心意是真的；下次可以先留出通道，再問她希望怎麼安排。" },
        { text: "先問阿嬤想怎麼走，一起在隊伍外側等車內的人下完。", type: "question", echo: "阿嬤說她想自己拿著文件上車，你便陪她等車廂清空。把選擇交還給同行者，也能和「先下後上」的共同原則並行。" },
      ],
    },
    {
      place: "車站扶梯・轉乘通道", time: "18:02", tag: "右立左行？", cue: "扶梯口有人趕路，同行者手上提著文件袋。",
      consensusLabel: "依現場指引", consensusKind: "local", consensusText: "「右立左行」是部分人的習慣，不是每處通用規則；先看站方標示與安全提醒，握扶手、站穩踏階。",
      title: "有人說「左邊要空出來」，廣播卻提醒站穩扶好。",
      body: "你和阿嬤走到轉乘扶梯。熟悉的右側站立、左側通行習慣，和現場「握好扶手、站穩踏階」的提醒同時出現在你腦中。",
      prompt: "當習慣與現場安全指引不一致，你會依據什麼做決定？",
      mbti: {
        EI: ["可能開口提醒同行者先聽站內廣播。", "可能先看標示與周遭動線，再決定在哪裡停下。"],
        SN: ["可能先確認現場標線、扶手、告示寫了什麼。", "可能先想人流整體怎麼移動才不擠、不推人。"],
        TF: ["可能先比較地方規定和安全程序是否一致。", "可能先留意老人、孩童或提重物者的平衡需求。"],
        JP: ["可能依照明確標示先安排站位與同行順序。", "可能按現場人流調整，必要時改走電梯。"],
      },
      choices: [
        { text: "照現場標示握好扶手、站穩踏階；不催促或推擠前方乘客。", type: "room", echo: "隊伍慢了一點，卻沒有人需要邊走邊躲。你跟著當下的安全提醒，也沒有把過去的通行習慣變成責怪他人的理由。" },
        { text: "沿用熟悉的右立左行，提醒左側乘客讓出通道。", type: "voice", echo: "有人照你的提醒移動，也有人因行動狀況無法讓路。習慣能讓人預期彼此，但當地標示和安全提醒更值得先確認。" },
        { text: "陪阿嬤改搭旁邊電梯，並提醒趕時間的人先看站內指示。", type: "question", echo: "多走了幾步，阿嬤卻能扶穩扶手、不必勉強加快。你也發現「通行效率」不只一種做法，設施本身能否讓不同人安全使用也很重要。" },
      ],
    },
    {
      place: "辦公大樓・洽公櫃台", time: "18:14", tag: "電話還沒說完", cue: "櫃台同仁正在通話，等候線旁有一張訪客椅。",
      consensusLabel: "較明確的共識", consensusKind: "shared", consensusText: "等候對方說完，簡短清楚說明身分與來意，再依現場指引等候。",
      title: "你陪阿嬤送文件，櫃台正在接一通公務電話。",
      body: "預約時間快到了。阿嬤把文件交給你，櫃台同仁仍在聽電話；會議室門口有人等候，訪客椅旁也貼著等候線。",
      prompt: "如何兼顧時間、流程，也讓同行者保有說明自己需要的機會？",
      mbti: {
        EI: ["可能在合適空檔直接向櫃台介紹來意。", "可能先讀現場指示，整理好重點再開口。"],
        SN: ["可能先核對預約名字、文件和等候線位置。", "可能先想電話、會議與訪客流程怎麼銜接。"],
        TF: ["可能先關心每位訪客是否遵循相同流程。", "可能留意同仁和阿嬤現在是否承受時間壓力。"],
        JP: ["可能先把文件和說明順序排妥。", "可能依櫃台忙碌情況調整開口時機。"],
      },
      choices: [
        { text: "先在等候線旁等待；通話結束後，簡短說明預約與事由，再問在哪裡等候。", type: "room", echo: "電話那端先把事情說完，你再讓櫃台知道預約與來意。阿嬤補了一句她想親自確認的問題，洽公流程和她的聲音都被留了下來。" },
        { text: "隔著櫃台遞上文件，趁同仁通話時先說明，怕錯過預約。", type: "voice", echo: "你想避免遲到，卻讓電話裡的人和櫃台同仁都得分心。趕時間很真實；簡短等候、清楚交代重點，往往更能讓事情一次辦好。" },
        { text: "替阿嬤把事情全部講完，免得她說不清楚。", type: "question", echo: "櫃台很快知道你要辦什麼，但阿嬤似乎還有話想補充。下次可以先問她：「要不要我幫忙說？還是你想先講？」" },
      ],
    },
    {
      place: "餐廳・圓桌餐敘", time: "18:37", tag: "名牌還沒有擺好", cue: "主辦人正迎接來賓，桌邊留著幾個空位。",
      consensusLabel: "視場合詢問", consensusKind: "context", consensusText: "主客、主人安排與文化習慣會影響座次；看桌牌或問主辦人，也問同行者哪裡方便。",
      title: "圓桌旁有空位，卻不知道哪個位置適合。",
      body: "主辦人邀你和阿嬤參加商務餐敘。名牌還沒擺齊；有些座位靠近出入口，同行的阿嬤拿著拐杖，幾位長輩和客人也正寒暄。",
      prompt: "入席時，要怎麼看懂主人安排，也顧到同行者實際需要？",
      mbti: {
        EI: ["可能先向主辦人問好，當面確認座位安排。", "可能先觀察桌牌、出入口和大家的入座節奏。"],
        SN: ["可能注意座位牌、椅距與阿嬤進出的空間。", "可能先想整桌人如何相互介紹、方便交談。"],
        TF: ["可能依主辦方安排，確認座次一致而清楚。", "可能先問阿嬤哪個位置坐得安心、起身方便。"],
        JP: ["可能希望先安排妥當再入座。", "可能等主人和同行者的狀況明朗後再決定。"],
      },
      choices: [
        { text: "先看桌牌；若還沒安排，就問主辦人，也問阿嬤哪個位置出入方便。", type: "question", echo: "主辦人請阿嬤坐在靠走道但不擋通行的位置，你坐在她旁邊。你沒有只按年齡猜座次，而是把主人安排、文化情境和實際需要一起納入。" },
        { text: "選一張空椅子先坐下，把另一張椅子留給阿嬤。", type: "voice", echo: "你先找到了座位，但那張椅子可能另有安排；阿嬤也不一定想坐你替她挑的位置。先問一聲，常能避免好意變成替人決定。" },
        { text: "直接把最靠近主位的椅子讓給年長的來賓。", type: "room", echo: "年長來賓笑著謝謝你，卻說自己想坐在熟人旁邊。尊重長輩是心意；主位怎麼安排仍要看主人、主賓和桌上習慣，問清楚會更周到。" },
      ],
    },
    {
      place: "街角小店・晚餐後", time: "19:05", tag: "好意，先問再靠近", cue: "門口的傘架擋住轉彎空間，店員正在電話中。",
      consensusLabel: "先詢問本人", consensusKind: "ask", consensusText: "協助前先問當事人需要什麼；不要擅自推輪椅或搬動對方物品。",
      title: "門口的傘架，剛好擋住輪椅轉彎的位置。",
      body: "你們吃完飯準備離開。一位輪椅使用者停在門邊，店員還在通電話；同行朋友說「我把椅子挪開就好」，但對方還沒開口。",
      prompt: "當你看見可能的不便，怎麼讓幫忙保留對方的選擇？",
      mbti: {
        EI: ["可能先友善地詢問當事人需不需要幫忙。", "可能先觀察通道與物品位置，想好再開口。"],
        SN: ["可能先看傘架、門寬和輪椅轉向的實際空間。", "可能先想到店內動線要怎麼改才不只解決一次。"],
        TF: ["可能先確認調整方式是否對每位客人都公平。", "可能先問當事人此刻真正需要哪種協助。"],
        JP: ["可能先和店員商量，建立清楚的傘架位置。", "可能依客人、雨傘數量與動線彈性調整。"],
      },
      choices: [
        { text: "等店員通話告一段落，先問輪椅使用者：「需要我幫忙移開傘架嗎？」", type: "room", echo: "對方說可以幫忙挪傘架，並指了希望保留的轉彎空間。先問，讓協助成為合作；後來店員也把傘架移到不擋路的位置。" },
        { text: "直接推輪椅、挪傘架，讓對方快點通過。", type: "voice", echo: "你想把路清出來，卻在未經同意時碰了對方的輪椅。善意不會自動等於合適的幫忙；先問本人，讓他決定是否需要、要怎麼幫。" },
        { text: "先記下傘架擋路的情況，等店員有空時一起找新的擺放位置。", type: "question", echo: "當下沒有人被擅自移動，但通道也還沒清出來。你可以先詢問當事人是否需要立即協助，再和店員討論一個更長久的安排。" },
      ],
    },
  ];

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

  const endings = {
    room: { title: "你替彼此，留了一點空間。", copy: "你注意到等待、讓路與照顧別人的細節。這種選擇讓相處變得柔軟；也別忘了，空間要被看見，才有辦法一起調整。", memory: "這條路的線索：先看見別人，再把位置留出來。" },
    voice: { title: "你讓自己的聲音，也留在故事裡。", copy: "你記得自己也有時間、想法和需要。把需要說出來，並不會取消禮貌；說法與時機，可能讓彼此更有機會聽懂。", memory: "這條路的線索：關係裡不只需要體諒，也需要清楚表達。" },
    question: { title: "你把「為什麼」變成了一起商量。", copy: "你看見規則不一定清楚，空間也不一定公平。問一問、試一試，能讓禮貌不只是要求每個人配合，也成為共同改善日常的開始。", memory: "這條路的線索：有時候最友善的事，是一起把規則變得更好。" },
  };

  let sceneIndex = 0;
  let choices = new Array(scenes.length).fill(null);
  let activeSourceIndex = 0;
  let activeMbtiAxis = 0;

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
        $(`choiceList`).querySelector("button")?.focus({ preventScroll: true });
      });
      list.append(change);
    }
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
  $("mbtiOpen").addEventListener("click", () => {
    renderMbtiAxis();
    $("mbtiDialog").showModal();
    $(`mbtiTab${activeMbtiAxis}`).focus({ preventScroll: true });
  });
  $("mbtiClose").addEventListener("click", () => $("mbtiDialog").close());
  $("mbtiReturn").addEventListener("click", () => $("mbtiDialog").close());
  buildSources();
  buildMbtiTabs();
  setScreen("intro");
  setPanorama(0);
})();

(function exposeStory(root, factory) {
  const story = factory();
  if (typeof module === "object" && module.exports) module.exports = story;
  else root.MannersStory = story;
})(typeof globalThis !== "undefined" ? globalThis : this, function createStory() {
  const scenes = [
    {
      place: "家裡・晚餐前", time: "17:42", tag: "餐桌邊的小停頓", cue: "奶奶把一句話說到一半，桌上忽然安靜了。",
      consensusLabel: "一起商量", consensusKind: "context", consensusText: "輪流說話很有幫助；誰先說、想安靜一下，也可以說出來再協調。",
      title: "「我今天在市場……」奶奶停了一下。",
      body: "你正想分享學校裡的新鮮事，奶奶的故事也才剛開始。窗外雨聲滴答，大家的晚餐都還熱著；吃完飯，你和奶奶（家人也叫她阿嬤）還要一起出門洽公。",
      prompt: "如果你在這張餐桌旁，會怎麼讓每個人的故事都有位置？",
      mbti: {
        EI: ["可能先把想法說出來，邀請大家輪流聊。", "可能先聽完、想一想，再找舒服的空檔分享。"],
        SN: ["可能注意奶奶停頓的語氣和桌上的對話細節。", "可能先想到怎麼讓不同故事接在一起。"],
        TF: ["可能先留意每個人是否都有輪到說話。", "可能先感覺到奶奶或自己現在的心情。"],
        JP: ["可能想先約好一人說一段、依序分享。", "可能讓話題跟著當下自然流動。"],
      },
      choices: [
        { text: "先聽奶奶把故事說完，等一個自然的空檔再分享。", type: "room", memory: "等奶奶說完市場故事，再分享你的事。", echo: "奶奶把市場裡那隻迷路的小狗說完了。你的故事也沒有消失，只是多等了一會兒；晚餐桌多了一個可以接住彼此的空檔。" },
        { text: "輕聲說「我也有一件事想分享」，看看能不能輪流說。", type: "voice", memory: "說出想分享的事，讓兩個故事輪流說。", echo: "你把想說的話留在桌上，也把話題遞給奶奶。輪流不是誰先誰後的規定，而是兩個人的故事都有位置。" },
        { text: "先把話吞回去，讓大家安靜吃飯。", type: "voice", memory: "晚餐先安靜下來，你暫把故事留在心裡。", echo: "餐桌安靜下來了，但你的故事也暫時留在心裡。下次或許可以試著說出需要：安靜一會兒，或一起輪流聊聊。" },
      ],
    },
    {
      place: "捷運月台・下班時段", time: "17:54", tag: "車門打開的那一刻", cue: "人群往前一步，車廂裡還有人正要下車。",
      consensusLabel: "較明確的共識", consensusKind: "shared", consensusText: "搭乘大眾運輸先下後上，並留出門口通道；同行長輩也可以先問他想怎麼走。",
      title: "阿嬤說：「你先上車，我跟著就好。」",
      body: "晚餐後，你和阿嬤帶著文件出門洽公。列車停靠後，門口幾位乘客還在下車，旁邊也有推車乘客等著通過。",
      prompt: "先下後上是清楚的共識；怎麼一起做到，又不替同行者作主？",
      mbti: {
        EI: ["可能先提醒大家「讓車廂裡的人先下車」。", "可能先觀察門口和同行者的位置，再輕聲確認。"],
        SN: ["可能先看車門、隊伍、推車和可通行的空隙。", "可能先想整段人流怎麼走才不互相卡住。"],
        TF: ["可能先確認流程對前後乘客是否一致公平。", "可能先注意阿嬤是否自在、推車乘客是否需要空間。"],
        JP: ["可能先排好隊、等人下完再一起上車。", "可能依車廂和人流變化，彈性調整同行位置。"],
      },
      choices: [
        { text: "站在門旁留出通道，等乘客下完，再問阿嬤要不要你陪她上車。", type: "room", memory: "月台先留出車門，等乘客下車再問阿嬤。", echo: "乘客順利下車，你和阿嬤也一起上了車。你沒有把「照顧長輩」變成替她決定，而是先遵守通行共識，再問她需要什麼。" },
        { text: "先擠上車幫阿嬤佔位置，想說這樣比較照顧她。", type: "voice", memory: "你先上車替阿嬤佔位，卻擠過了下車乘客。", echo: "你很想確保阿嬤有位置，卻讓下車的人得繞開你。照顧的心意是真的；下次可以先留出通道，再問她希望怎麼安排。" },
        { text: "先問阿嬤想怎麼走，一起在隊伍外側等車內的人下完。", type: "question", memory: "先問阿嬤的想法，再一起等乘客下車。", echo: "阿嬤說她想自己拿著文件上車，你便陪她等車廂清空。把選擇交還給同行者，也能和「先下後上」的共同原則並行。" },
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
        { text: "照現場標示握好扶手、站穩踏階；不催促或推擠前方乘客。", type: "room", memory: "你和阿嬤照標示站穩扶好，沒有催促前方乘客。", echo: "隊伍慢了一點，卻沒有人需要邊走邊躲。你跟著當下的安全提醒，也沒有把過去的通行習慣變成責怪他人的理由。" },
        { text: "沿用熟悉的右立左行，提醒左側乘客讓出通道。", type: "voice", memory: "你沿用右立左行的習慣，提醒左側乘客讓路。", echo: "有人照你的提醒移動，也有人因行動狀況無法讓路。習慣能讓人預期彼此，但當地標示和安全提醒更值得先確認。" },
        { text: "陪阿嬤改搭旁邊電梯，並提醒趕時間的人先看站內指示。", type: "question", memory: "你陪阿嬤改搭電梯，她拿穩了文件袋。", echo: "多走了幾步，阿嬤卻能扶穩扶手、不必勉強加快。你也發現「通行效率」不只一種做法，設施本身能否讓不同人安全使用也很重要。" },
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
        { text: "先在等候線旁等待；通話結束後，簡短說明預約與事由，再問在哪裡等候。", type: "room", memory: "等通話結束後再報預約，也留時間讓阿嬤補充。", echo: "電話那端先把事情說完，你再讓櫃台知道預約與來意。阿嬤補了一句她想親自確認的問題，洽公流程和她的聲音都被留了下來。" },
        { text: "隔著櫃台遞上文件，趁同仁通話時先說明，怕錯過預約。", type: "voice", memory: "你趁櫃台通話時遞上文件，怕錯過預約。", echo: "你想避免遲到，卻讓電話裡的人和櫃台同仁都得分心。趕時間很真實；簡短等候、清楚交代重點，往往更能讓事情一次辦好。" },
        { text: "替阿嬤把事情全部講完，免得她說不清楚。", type: "question", memory: "你替阿嬤說明事由，她似乎還有話想補充。", echo: "櫃台很快知道你要辦什麼，但阿嬤似乎還有話想補充。下次可以先問她：「要不要我幫忙說？還是你想先講？」" },
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
        { text: "先看桌牌；若還沒安排，就問主辦人，也問阿嬤哪個位置出入方便。", type: "question", memory: "看桌牌、問主辦人，也問阿嬤哪裡出入方便。", echo: "主辦人請阿嬤坐在靠走道但不擋通行的位置，你坐在她旁邊。你沒有只按年齡猜座次，而是把主人安排、文化情境和實際需要一起納入。" },
        { text: "選一張空椅子先坐下，把另一張椅子留給阿嬤。", type: "voice", memory: "你先坐下替阿嬤留位，卻還不知道她是否方便。", echo: "你先找到了座位，但那張椅子可能另有安排；阿嬤也不一定想坐你替她挑的位置。先問一聲，常能避免好意變成替人決定。" },
        { text: "直接把最靠近主位的椅子讓給年長的來賓。", type: "room", memory: "你把主位讓給年長來賓，她想坐在熟人旁邊。", echo: "年長來賓笑著謝謝你，卻說自己想坐在熟人旁邊。尊重長輩是心意；主位怎麼安排仍要看主人、主賓和桌上習慣，問清楚會更周到。" },
      ],
    },
    {
      place: "街角小店・晚餐後", time: "19:05", tag: "好意，先問再靠近", cue: "門口的傘架擋住轉彎空間，店員正在電話中。",
      consensusLabel: "先詢問本人", consensusKind: "ask", consensusText: "協助前先問當事人需要什麼；不要擅自推輪椅或搬動對方物品。",
      title: "門口的傘架，剛好擋住輪椅轉彎的位置。",
      body: "洽公和餐敘都告一段落，雨也停了。你和阿嬤來到街角小店，一位輪椅使用者停在門邊；店員還在通電話，同行朋友說「我把椅子挪開就好」，但對方還沒開口。",
      prompt: "當你看見可能的不便，怎麼讓幫忙保留對方的選擇？",
      mbti: {
        EI: ["可能先友善地詢問當事人需不需要幫忙。", "可能先觀察通道與物品位置，想好再開口。"],
        SN: ["可能先看傘架、門寬和輪椅轉向的實際空間。", "可能先想到店內動線要怎麼改才不只解決一次。"],
        TF: ["可能先確認調整方式是否對每位客人都公平。", "可能先問當事人此刻真正需要哪種協助。"],
        JP: ["可能先和店員商量，建立清楚的傘架位置。", "可能依客人、雨傘數量與動線彈性調整。"],
      },
      choices: [
        { text: "等店員通話告一段落，先問輪椅使用者：「需要我幫忙移開傘架嗎？」", type: "room", memory: "先問輪椅使用者是否需要幫忙移開傘架。", echo: "對方說可以幫忙挪傘架，並指了希望保留的轉彎空間。先問，讓協助成為合作；後來店員也把傘架移到不擋路的位置。" },
        { text: "直接推輪椅、挪傘架，讓對方快點通過。", type: "voice", memory: "你直接推輪椅、挪傘架，沒先徵求同意。", echo: "你想把路清出來，卻在未經同意時碰了對方的輪椅。善意不會自動等於合適的幫忙；先問本人，讓他決定是否需要、要怎麼幫。" },
        { text: "先記下傘架擋路的情況，等店員有空時一起找新的擺放位置。", type: "question", memory: "你和店員商量傘架的新位置，讓通道更順。", echo: "當下沒有人被擅自移動，但通道也還沒清出來。你可以先詢問當事人是否需要立即協助，再和店員討論一個更長久的安排。" },
      ],
    },
  ];

  const endings = {
      room: { title: "你替彼此，留了一點空間。", copy: "你注意到等待、讓路與照顧別人的細節。這種選擇讓相處變得柔軟；也別忘了，空間要被看見，才有辦法一起調整。" },
      voice: { title: "你讓自己的聲音，也留在故事裡。", copy: "你記得自己也有時間、想法和需要。把需要說出來，並不會取消禮貌；說法與時機，可能讓彼此更有機會聽懂。" },
      question: { title: "你把「為什麼」變成了一起商量。", copy: "你看見規則不一定清楚，空間也不一定公平。問一問、試一試，能讓禮貌不只是要求每個人配合，也成為共同改善日常的開始。" },
  };

  const closing = "洽公和餐敘告一段落，雨也停了。你和阿嬤收好文件，沿著街角慢慢走回家。這一晚的話與步伐，都有彼此的位置。";

  function resolveEcho(sceneIndex, choiceIndex, priorChoices = []) {
    const scene = scenes[sceneIndex];
    const choice = scene?.choices?.[choiceIndex];
    if (!choice) return "";
    const context = { sceneIndex, choiceIndex, priorChoices, scenes };
    const base = typeof choice.echo === "function" ? choice.echo(context) : choice.echo;
    const callbacks = {
      1: () => {
        if (priorChoices[0] === 0) return "餐桌上你等奶奶把市場故事說完；這份耐心也陪你們來到月台。";
        if (priorChoices[0] === 1) return "餐桌上你把想分享的事留在對話裡；一路出門，彼此仍能輪流說、輪流聽。";
        if (priorChoices[0] === 2) return "餐桌上你先把故事留在心裡；出門後，阿嬤的步調也可以慢慢確認。";
        return "晚餐後你陪家人出門，餐桌上的對話也一路同行。";
      },
      2: () => {
        if (priorChoices[1] === 2) return "月台上你先問阿嬤想怎麼走；轉乘時，你們也一起看著現場指示。";
        if (priorChoices[0] === 0) return "餐桌上你等奶奶說完，到了扶梯口，也願意多看一眼現場提醒。";
        return "從月台到扶梯，你和阿嬤仍一起確認怎麼走得穩當。";
      },
      3: () => {
        if (priorChoices[1] === 2) return "你還記得在月台先問阿嬤想怎麼走；到了櫃台，也讓她決定要自己說，或請你幫忙。";
        if (priorChoices[2] === 2) return "扶梯旁你們一起改搭電梯，阿嬤手上的文件袋一直拿得穩；到了櫃台，再慢慢把文件交好。";
        return "一路上你陪阿嬤看指示、拿文件；到了櫃台，也留一點時間讓她說明需要。";
      },
      4: () => {
        const moments = [];
        if (priorChoices[1] === 2) moments.push("在月台先問阿嬤想怎麼走");
        if (priorChoices[2] === 2) moments.push("在扶梯旁一起改搭電梯，阿嬤手上的文件袋拿得穩");
        if (moments.length) return `你還記得${moments.join("；也記得")}。圓桌旁，你們仍把她的需要放進商量裡。`;
        if (priorChoices[3] === 2) return "櫃台前你先問阿嬤要不要自己說；圓桌旁，也先聽聽她想坐在哪裡。";
        return "文件交妥後，你和阿嬤來到餐敘；一路上，先看情況、再問彼此的習慣沒有變。";
      },
      5: () => {
        if (priorChoices[4] === 0) return "圓桌旁你問過阿嬤哪裡出入方便；到了街角，你也先問輪椅使用者需要什麼。";
        if (priorChoices[3] === 2) return "櫃台前你留意阿嬤想親自確認的事；街角這一刻，也把選擇交給當事人。";
        return "這一晚你和阿嬤從餐桌走到街角；眼前需要幫忙的人，也值得先被問一聲。";
      },
    };
    const callback = callbacks[sceneIndex]?.();
    return [base, callback].filter(Boolean).join(" ");
  }

  function getEndingKey(choices) {
    const counts = { room: 0, voice: 0, question: 0 };
    let lastType = "room";
    choices.forEach((choiceIndex, sceneIndex) => {
      if (choiceIndex === null || !Number.isInteger(choiceIndex)) return;
      const choice = scenes[sceneIndex]?.choices?.[choiceIndex];
      if (!choice) return;
      lastType = choice.type;
      counts[lastType] += 1;
    });
    const max = Math.max(...Object.values(counts));
    const leaders = Object.keys(counts).filter((key) => counts[key] === max);
    return leaders.includes(lastType) ? lastType : leaders[0];
  }

  function buildEnding(choices) {
    const ending = endings[getEndingKey(choices)];
    const selected = choices.flatMap((choiceIndex, sceneIndex) => {
      const choice = Number.isInteger(choiceIndex) ? scenes[sceneIndex]?.choices?.[choiceIndex] : null;
      if (!choice) return [];
      return [{ sceneIndex, text: choice.memory || choice.text }];
    });
    const memories = selected.length <= 4
      ? selected
      : [selected[0], selected[Math.round((selected.length - 1) / 3)], selected[Math.round(2 * (selected.length - 1) / 3)], selected[selected.length - 1]];
    const memoryLines = memories.map(({ sceneIndex, text }) => `${scenes[sceneIndex].place}：${text}`);
    const memory = `${memoryLines.length ? `這一晚留下的畫面：\n${memoryLines.join("\n")}` : "這一晚還有許多可能的走法。"}\n${closing}`;
    return {
      title: ending.title,
      copy: `${ending.copy} ${closing}`,
      memory,
    };
  }

  function serializeProgress(progress) {
    return JSON.stringify(progress);
  }

  function parseProgress(raw, { sceneCount = scenes.length, choiceCounts = scenes.map((scene) => scene.choices.length), sourceCount = 1, validScreens = ["story", "ending", "sources"] } = {}) {
    try {
      const progress = JSON.parse(raw);
      const validChoices = Array.isArray(progress?.choices) && progress.choices.length === sceneCount
        && progress.choices.every((choice, index) => choice === null
          || (Number.isInteger(choice) && choice >= 0 && choice < choiceCounts[index]));
      if (progress?.version !== 1 || !validScreens.includes(progress.screen)
        || !Number.isInteger(progress.sceneIndex) || progress.sceneIndex < 0 || progress.sceneIndex >= sceneCount
        || !validChoices) return null;
      return {
        screen: progress.screen,
        sceneIndex: progress.sceneIndex,
        choices: progress.choices,
        activeSourceIndex: Number.isInteger(progress.activeSourceIndex)
          && progress.activeSourceIndex >= 0 && progress.activeSourceIndex < sourceCount
          ? progress.activeSourceIndex : 0,
      };
    } catch {
      return null;
    }
  }

  return { scenes, resolveEcho, getEndingKey, buildEnding, serializeProgress, parseProgress };
});

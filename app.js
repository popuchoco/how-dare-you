(() => {
  const stories = {
    home: {
      place: '家裡 · 聽與說',
      title: '飯桌邊的話，還沒有說完。',
      scene: '家人說到一半，你的故事已經等不及了。你也很想被聽見。',
      choices: [
        { label: '等一句話落下，再接上自己的故事。', echo: '先聽完，對方知道自己被好好接住。你也可以補一句：「等一下我也想分享。」讓彼此都有位置。' },
        { label: '先說：「我有一件事想講，可以嗎？」', echo: '先問一聲，把自己的需要也說清楚。禮貌不是只能安靜，也包含讓自己被聽見。' },
        { label: '一著急，就大聲把話接過來。', echo: '兩個故事可能撞在一起。想重新開始時，可以說：「剛才我太急了，還想聽你說。」一句修補，也是一種體貼。' }
      ]
    },
    bus: {
      place: '街上 · 一起前進',
      title: '車門打開的那兩秒。',
      scene: '公車到了。有人正在下車，後面也有人趕著上車。你注意到什麼？',
      choices: [
        { label: '先讓車上的人走出來，再上車。', echo: '留出一條路，下一個人會更容易前進。小小的空隙，讓整車的人都少一點碰撞。' },
        { label: '隊伍看不清楚，先問：「大家是在這裡排嗎？」', echo: '不必猜規矩；問清楚也是照顧，讓別人不用在尷尬裡猜你的意思。' },
        { label: '我很趕，先擠到門邊再說。', echo: '趕時間的感覺是真的。也可以試著說：「不好意思，我要下車。」讓彼此知道下一步，常常就多出一點空間。' }
      ]
    },
    visit: {
      place: '朋友家 · 一起生活',
      title: '朋友家的小宇宙，也有自己的節奏。',
      scene: '玩具散在地上，大家準備換下一個活動。朋友還在看著那些玩具。',
      choices: [
        { label: '問：「要不要一起收？你想先收哪一個？」', echo: '先詢問，再一起動手。這樣既照顧了空間，也把選擇留給了朋友。' },
        { label: '把自己玩過的東西放回原位。', echo: '看見共同用過的東西、留意環境，會讓下一個人也好開始。若不確定放哪裡，問一聲就好。' },
        { label: '不確定怎麼做，就先停一下看看。', echo: '觀察也是一種方法。看一看主人怎麼做，再問：「我可以幫忙嗎？」讓善意有一個舒服的入口。' }
      ]
    },
    call: {
      place: '說話時 · 聽見彼此',
      title: '電話那一端，也有人。',
      scene: '你正和朋友講電話。身邊有人在休息，電話另一端的人也正說著一件重要的事。',
      choices: [
        { label: '先聽清楚，再回應；把音量留在身邊。', echo: '話說得清楚、回應到位，電話兩端都比較舒服。在公共空間，也記得替旁邊的人留一點安靜。' },
        { label: '先問：「你現在方便聽我說一下嗎？」', echo: '先確認時間和需要，讓對話從彼此都準備好的地方開始。' },
        { label: '一邊放影片，一邊讓電話繼續通著。', echo: '其他聲音會跑進對話。把手機放下、聽完再回應，若剛才分心了，也可以說一聲「我再聽一次」。' }
      ]
    }
  };

  const dialog = document.getElementById('storyDialog');
  const dialogPlace = document.getElementById('dialogPlace');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogScene = document.getElementById('dialogScene');
  const dialogChoices = document.getElementById('dialogChoices');
  const dialogEcho = document.getElementById('dialogEcho');
  const dialogEchoText = document.getElementById('dialogEchoText');
  const closeDialog = document.getElementById('closeDialog');
  const tryAgain = document.getElementById('tryAgain');
  let activeTrigger = null;

  function openStory(key, trigger) {
    const story = stories[key];
    if (!story) return;
    activeTrigger = trigger || document.activeElement;
    dialogPlace.textContent = story.place;
    dialogTitle.textContent = story.title;
    dialogScene.textContent = story.scene;
    dialogChoices.replaceChildren();
    dialogEcho.hidden = true;
    dialogEchoText.textContent = '';

    story.choices.forEach((choice) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'dialog-choice';
      button.textContent = choice.label;
      button.addEventListener('click', () => {
        dialogChoices.querySelectorAll('.dialog-choice').forEach((item) => item.classList.remove('is-selected'));
        button.classList.add('is-selected');
        dialogEchoText.textContent = choice.echo;
        dialogEcho.hidden = false;
        tryAgain.focus({ preventScroll: true });
      });
      dialogChoices.append(button);
    });

    if (!dialog.open) dialog.showModal();
    closeDialog.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-open-scene]').forEach((button) => {
    button.addEventListener('click', () => openStory(button.dataset.openScene, button));
  });

  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (activeTrigger && typeof activeTrigger.focus === 'function') activeTrigger.focus({ preventScroll: true });
  });
  tryAgain.addEventListener('click', () => {
    dialogEcho.hidden = true;
    dialogChoices.querySelectorAll('.dialog-choice').forEach((item) => item.classList.remove('is-selected'));
    const firstChoice = dialogChoices.querySelector('.dialog-choice');
    if (firstChoice) firstChoice.focus({ preventScroll: true });
  });

  const windowEl = document.getElementById('panoramaWindow');
  const track = document.getElementById('panoramaTrack');
  const panLeft = document.getElementById('panLeft');
  const panRight = document.getElementById('panRight');
  let offset = 0;
  let startX = 0;
  let startOffset = 0;
  let dragging = false;
  let moved = false;

  function maxOffset() {
    return Math.max(0, track.getBoundingClientRect().width - windowEl.getBoundingClientRect().width);
  }

  function setOffset(next) {
    offset = Math.max(0, Math.min(maxOffset(), next));
    track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  }

  panLeft.addEventListener('click', () => setOffset(offset - windowEl.clientWidth * 0.62));
  panRight.addEventListener('click', () => setOffset(offset + windowEl.clientWidth * 0.62));
  document.querySelectorAll('.hotspot').forEach((hotspot) => {
    hotspot.addEventListener('focus', () => {
      const view = windowEl.getBoundingClientRect();
      const item = hotspot.getBoundingClientRect();
      if (item.left < view.left + 12) setOffset(offset + item.left - view.left - 20);
      else if (item.right > view.right - 12) setOffset(offset + item.right - view.right + 20);
    });
  });
  windowEl.addEventListener('keydown', (event) => {
    if (event.target !== windowEl) return;
    if (event.key === 'ArrowLeft') { event.preventDefault(); setOffset(offset - windowEl.clientWidth * 0.3); }
    if (event.key === 'ArrowRight') { event.preventDefault(); setOffset(offset + windowEl.clientWidth * 0.3); }
  });
  windowEl.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, a')) return;
    startX = event.clientX;
    startOffset = offset;
    dragging = true;
    moved = false;
  });
  windowEl.addEventListener('pointermove', (event) => {
    if (!dragging) return;
    const delta = event.clientX - startX;
    if (Math.abs(delta) > 5) {
      moved = true;
      windowEl.classList.add('is-dragging');
      if (windowEl.hasPointerCapture && !windowEl.hasPointerCapture(event.pointerId)) windowEl.setPointerCapture(event.pointerId);
    }
    if (moved) setOffset(startOffset - delta);
  });
  const endDrag = (event) => {
    if (event && windowEl.hasPointerCapture && windowEl.hasPointerCapture(event.pointerId)) windowEl.releasePointerCapture(event.pointerId);
    dragging = false;
    windowEl.classList.remove('is-dragging');
  };
  windowEl.addEventListener('pointerup', endDrag);
  windowEl.addEventListener('pointercancel', endDrag);
  window.addEventListener('resize', () => setOffset(offset));

  document.querySelectorAll('.promise-choice').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.promise-choice').forEach((item) => {
        item.classList.remove('is-chosen');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('is-chosen');
      button.setAttribute('aria-pressed', 'true');
      document.getElementById('promiseResponse').textContent = `好，今天就先帶著這句：「${button.textContent}」不用打卡，記得就很好。`;
    });
    button.setAttribute('aria-pressed', 'false');
  });
})();

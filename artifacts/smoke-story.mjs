import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { scenes, resolveEcho, buildEnding, serializeProgress, parseProgress } = require("../story-data.js");

assert.equal(scenes.length, 6, "故事應有六幕");
scenes.forEach((scene, sceneIndex) => {
  assert.ok(scene.choices.length > 0, `第 ${sceneIndex + 1} 幕應有選擇`);
  scene.choices.forEach((choice, choiceIndex) => {
    assert.ok(typeof choice.echo === "string" || typeof choice.echo === "function", "每個選擇都應有回聲或回聲函式");
    const priorChoices = scenes.map((_, index) => index < sceneIndex ? index % 3 : null);
    assert.ok(resolveEcho(sceneIndex, choiceIndex, priorChoices).trim(), "每個選擇都應能解析出非空回聲");
  });
});

const platformCallback = resolveEcho(3, 0, [0, 2, 0, null, null, null]);
assert.ok(platformCallback.includes("月台先問阿嬤"), "櫃台回聲應記得月台的提問");
const escalatorCallback = resolveEcho(4, 0, [0, 0, 2, 0, null, null]);
assert.ok(escalatorCallback.includes("阿嬤手上的文件袋拿得穩"), "圓桌回聲應記得一起改搭電梯");

const choiceVectors = [
  [0, 0, 0, 0, 0, 0],
  [1, 2, 2, 1, 0, 2],
  [2, 1, 1, 2, 2, 1],
];
choiceVectors.forEach((choices) => {
  const ending = buildEnding(choices);
  assert.ok(ending.title.trim());
  assert.ok(ending.copy.trim());
  assert.ok(ending.memory.includes("走回家"));
  const memoryCount = (ending.memory.match(/：[^\n]+/g) || []).length;
  assert.ok(memoryCount >= 2 && memoryCount <= 4, `結尾應回想二至四個選擇，實際為 ${memoryCount}`);
  const selectedMemories = choices.map((choiceIndex, sceneIndex) => scenes[sceneIndex].choices[choiceIndex].memory);
  assert.ok(selectedMemories.some((memory) => ending.memory.includes(memory)), "結尾應包含實際選擇留下的記憶");
});

const progress = {
  version: 1,
  screen: "ending",
  sceneIndex: 5,
  choices: [0, 1, 2, 0, 1, 2],
  activeSourceIndex: 4,
};
const parsed = parseProgress(serializeProgress(progress), {
  sceneCount: scenes.length,
  choiceCounts: scenes.map((scene) => scene.choices.length),
  sourceCount: 6,
  validScreens: ["story", "ending", "sources"],
});
assert.deepEqual(parsed, {
  screen: progress.screen,
  sceneIndex: progress.sceneIndex,
  choices: progress.choices,
  activeSourceIndex: progress.activeSourceIndex,
});
assert.equal(parseProgress('{"version":2}'), null, "不相容的進度版本應安全忽略");

console.log("故事冒煙檢查完成：六幕回聲、跨幕回憶、三種結尾與本機進度往返皆通過。");

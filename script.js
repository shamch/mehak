/*
  EDIT THIS OBJECT: chapters, page text, the final question, and button labels
  are collected here so you can replace them easily.
*/
const BOOK = {
  finalQuestion: "Will you choose Year 2 with me?",
  choices: ["YES ❤️", "OF COURSE ❤️"],
  finalMessage: "Then here's to another year of us. ❤️",
  pages: [
    { chapter: "Chapter I", title: "The Beginning", image: "assets/cat-bouquet-glasses.jpg", text: "One year ago, I made you a little Roblox game. You walked through an obby without knowing what was waiting for you at the end. And when you finally reached it, there was one question waiting for you..." },
    { chapter: "Chapter II", title: "The Question", image: "assets/cat-roses-letter.jpg", text: "Will you be my girlfriend? It was a small question sitting at the end of a very homemade game, but I remember how huge that moment felt. Somehow, it started this whole little world we have been building ever since." },
    { chapter: "Chapter III", title: "How everything started", image: "assets/cat-tuxedo-rose.jpg", text: "At first, it was just the ordinary things: messages, jokes, little updates about our days. Then those ordinary things became the part of my day I looked forward to most. I like that there was no grand plan—just us, finding a rhythm that felt surprisingly easy." },
    { chapter: "Chapter IV", title: "The little moments", image: "assets/cat-rose-closeup.jpg", text: "The things I keep coming back to are often the smallest ones. The way a conversation can run longer than either of us expected, a random photo, a message at exactly the right time, or simply knowing you are there at the other end of a busy day. Those moments quietly became home." },
    { chapter: "Chapter V", title: "The funny moments", image: "assets/cat-rose-soft.jpg", text: "There have been so many moments that would make absolutely no sense to anyone else, which is probably why they are so good. The weird jokes, the tiny arguments we turned into comedy, the things we could not stop laughing about—it is nice having someone who understands the reference before I even explain it." },
    { chapter: "Chapter VI", title: "The difficult moments", image: "assets/kitten-holding-rose.jpg", text: "Not every day has been effortless, and I would not pretend otherwise. But even the harder moments have shown me something important: we can pause, listen, and find our way back to each other. I appreciate the patience it takes to choose each other when things are not perfectly simple." },
    { chapter: "Chapter VII", title: "Things I love about you", image: "assets/cat-bouquet-glasses.jpg", text: "I love the way you are completely yourself. I love your little reactions, your perspective on things, and the care you bring into places without making a big announcement about it. I love that being around you can make a regular day feel less regular." },
    { chapter: "Chapter VIII", title: "What this year meant to me", image: "assets/cat-roses-letter.jpg", text: "This year gave me more than a list of memories. It gave me a person to share things with—the exciting stuff, the boring stuff, and all the in-between bits that are easier when you do not have to carry them alone. That has meant more to me than I always know how to say." },
    { chapter: "Chapter IX", title: "Looking back", image: "assets/cat-tuxedo-rose.jpg", text: "If I could visit the version of me putting that Roblox obby together, I think I would tell him to take a breath and enjoy it. He had no idea how many conversations, laughs, and tiny traditions were waiting on the other side of that one brave question." },
    { chapter: "Chapter X", title: "Looking forward", image: "assets/kitten-holding-rose.jpg", text: "I do not need the next year to be perfect or dramatic. I just want more of us: more stories to tell, more things to laugh about, more chances to be there for each other, and more of the little moments that somehow turn into the important ones." },
    { special: true, title: "One year ago, I asked you a question." },
    { special: true, title: "I already know the answer to that one." },
    { special: true, title: "Now I have another question." },
    { final: true }
  ]
};

const stage = document.querySelector("#stage");
const openButton = document.querySelector("#openBook");
const leftPage = document.querySelector("#leftPage");
const rightPage = document.querySelector("#rightPage");
const turnLayer = document.querySelector("#turnLayer");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const progress = document.querySelector("#progress");
const hint = document.querySelector("#hint");
const spreadElement = document.querySelector("#spread");
let spread = 0;
let opened = false;
let turning = false;
let dragStart = null;
const mobileView = window.matchMedia("(max-width: 650px)").matches;

function numberLabel(index) {
  return String(index + 1).padStart(2, "0");
}
function pageMarkup(page, side, index) {
  if (!page) return '<div class="page-content"><div class="flourish">❦</div></div>';
  const number = '<span class="page-number">' + numberLabel(index) + '</span>';
  if (page.final) {
    let buttons = "";
    BOOK.choices.forEach(function(label, i) {
      buttons += '<button data-choice="' + i + '">' + label + "</button>";
    });
    return '<div class="page-content final"><p class="chapter-label">The next chapter</p><div class="flourish">✦</div><h2>' + BOOK.finalQuestion + '</h2><div class="choices">' + buttons + '</div><p class="answer" id="answer">' + BOOK.finalMessage + "</p></div>";
  }
  if (page.special) {
    return '<div class="page-content special"><div class="flourish">✦</div><h2>' + page.title + "</h2></div>" + number;
  }
  const image = page.image ? '<figure class="memory-photo"><img src="' + page.image + '" alt="A sweet memory"></figure>' : "";
  return '<div class="page-content"><p class="chapter-label">' + page.chapter + "</p><h2>" + page.title + "</h2><p>" + page.text + "</p>" + image + '<div class="flourish">❦</div></div>' + number;
}
function attachChoiceEvents() {
  document.querySelectorAll("[data-choice]").forEach(function(button) {
    button.addEventListener("click", function(event) {
      event.stopPropagation();
      const answer = document.querySelector("#answer");
      if (answer) answer.classList.add("show");
    });
  });
}
function render() {
  if (mobileView) {
    leftPage.innerHTML = "";
    rightPage.innerHTML = pageMarkup(BOOK.pages[spread], "right", spread);
    progress.textContent = "Page " + (spread + 1) + " of " + BOOK.pages.length;
    previous.disabled = spread === 0;
    next.disabled = spread >= BOOK.pages.length - 1;
    attachChoiceEvents();
    return;
  }
  const leftIndex = spread * 2;
  const rightIndex = leftIndex + 1;
  leftPage.innerHTML = pageMarkup(BOOK.pages[leftIndex], "left", leftIndex);
  rightPage.innerHTML = pageMarkup(BOOK.pages[rightIndex], "right", rightIndex);
  progress.textContent = "Pages " + (leftIndex + 1) + "–" + Math.min(rightIndex + 1, BOOK.pages.length) + " of " + BOOK.pages.length;
  previous.disabled = spread === 0;
  next.disabled = rightIndex >= BOOK.pages.length - 1;
  attachChoiceEvents();
}
function face(content, side, kind) {
  return '<div class="turn-face ' + kind + ' page ' + side + '">' + content + "</div>";
}
function turn(direction) {
  const maxSpread = mobileView ? BOOK.pages.length - 1 : Math.ceil(BOOK.pages.length / 2) - 1;
  const target = spread + direction;
  if (turning || target < 0 || target > maxSpread) return;
  turning = true;
  const oldSpread = spread;
  const oldIndex = mobileView ? oldSpread : (direction > 0 ? oldSpread * 2 + 1 : oldSpread * 2);
  const targetIndex = mobileView ? target : (direction > 0 ? target * 2 : target * 2 + 1);
  const oldSide = mobileView ? "right" : (direction > 0 ? "right" : "left");
  const newSide = mobileView ? "right" : (direction > 0 ? "left" : "right");
  spread = target;
  render();
  const sheet = document.createElement("div");
  sheet.className = "turn-sheet " + (direction > 0 ? "forward" : "backward");
  sheet.innerHTML = face(pageMarkup(BOOK.pages[oldIndex], oldSide, oldIndex), oldSide, "front") + face(pageMarkup(BOOK.pages[targetIndex], newSide, targetIndex), newSide, "back");
  turnLayer.appendChild(sheet);
  requestAnimationFrame(function() { sheet.classList.add("flip"); });
  sheet.addEventListener("animationend", function() {
    sheet.remove();
    turning = false;
  }, { once: true });
}
openButton.addEventListener("click", function() {
  if (opened) return;
  opened = true;
  stage.classList.remove("is-closed");
  hint.textContent = "tap a page edge, use arrows, or drag a corner";
  render();
});
next.addEventListener("click", function() { turn(1); });
previous.addEventListener("click", function() { turn(-1); });
spreadElement.addEventListener("click", function(event) {
  if (!opened || turning || event.target.closest("button")) return;
  const rect = spreadElement.getBoundingClientRect();
  const x = event.clientX - rect.left;
  if (mobileView) {
    if (x > rect.width * 0.5) turn(1); else turn(-1);
  } else {
    if (x > rect.width * 0.56) turn(1);
    if (x < rect.width * 0.44) turn(-1);
  }
});
spreadElement.addEventListener("pointerdown", function(event) {
  if (!opened || turning || event.target.closest("button")) return;
  const rect = spreadElement.getBoundingClientRect();
  dragStart = { x: event.clientX, side: event.clientX > rect.left + rect.width / 2 ? 1 : -1 };
});
spreadElement.addEventListener("pointerup", function(event) {
  if (!dragStart) return;
  const moved = event.clientX - dragStart.x;
  if (Math.abs(moved) > 42) {
    if (dragStart.side === 1 && moved < 0) turn(1);
    if (dragStart.side === -1 && moved > 0) turn(-1);
  }
  dragStart = null;
});
window.addEventListener("keydown", function(event) {
  if (!opened && (event.key === "Enter" || event.key === " ")) {
    openButton.click();
  } else if (opened && event.key === "ArrowRight") {
    turn(1);
  } else if (opened && event.key === "ArrowLeft") {
    turn(-1);
  }
});
window.matchMedia("(max-width: 650px)").addEventListener("change", function() {
  window.location.reload();
});
render();

/*
  EDIT THIS OBJECT: chapters, page text, the final question, and button labels
  are collected here so you can replace them easily.
*/
const BOOK = {
  finalQuestion: "Will you choose Year 2 with me?",
  choices: ["YES ❤️", "OF COURSE ❤️"],
  finalMessage: "Then here's to another year of us. ❤️",
  pages: [
    { chapter: "Chapter I", title: "The Girl From Another Section", image: "cat-bouquet-glasses.jpg", compact: true, text: "I still remember that English class. Our sections had been combined, and that was the first time I ever saw you. You were so quiet, and somehow I couldn't stop looking at you. I remember thinking you were the most beautiful girl I'd ever seen" },
    { chapter: "Chapter II", title: "Your First Impression of Me 😭", image: "cat-roses-letter.jpg", compact: true, text: "My first impression of you was <em>the most beautiful girl I've ever seen.</em><br><br>Your first impression of me, unfortunately, was probably: <strong>“This guy might be racist.”</strong> 😭<br><br>Because during our PE re-exam, the first time I actually got to talk to you, I somehow said, “Are you really from South India? I don't buy it. You're the first South Indian I've ever seen so pretty.”<br><br>I swear I was trying to compliment you. I just had absolutely no idea how to do it. And somehow, you called me pretty too. I still don't know if you were genuinely complimenting me or just being nice, but honestly, I don't care. It was our first little conversation, and I'll always remember it." },
    { chapter: "Chapter III", title: "The Cat", image: "cat-tuxedo-rose.jpg", compact: true, text: "Before you were my girlfriend, there was already one thing I knew about you: <strong>you absolutely loved cats.</strong><br><br>So naturally, I showed up at your house with a cat plushie. And yes, I embarrassed myself in front of your mom while doing it. 😭<br><br>But I'd do it again. Because there was something so sweet about being able to give you something I knew would make you happy." },
    { chapter: "Chapter IV", title: "The Question", image: "cat-rose-closeup.jpg", compact: true, text: "Then came the most unnecessarily complicated way of asking someone to be your girlfriend.<br><br>I made you a Roblox obby. You played through it, reached the end, and found the website I'd made. You dragged through the pages until you finally reached the question: <strong>“Will you be my girlfriend?”</strong><br><br>And you said yes.<br><br>It's funny how one tiny word can completely change the story you're living. That <strong>yes</strong> became a whole year." },
    { chapter: "Chapter V", title: "The Little Things", image: "cat-rose-soft.jpg", compact: true, text: "There are things about you that I don't think I'll ever stop noticing.<br><br>The tiny throat-clear you do before you speak your dad calling it the <em>car engine starting.</em> 😭<br><br>The way you tilt your head when you're listening. The way you take off your glasses and rub your eyes. The way you can become ten times more excited the second a cat is involved." },
    { chapter: "Chapter VI", title: "You", image: "kitten-holding-rose.jpg", compact: true, text: "I don't think you realize how much of my world exists in the little things about you.<br><br>You're calm where I'm chaotic. You're always gentle in ways I don't always know how to describe. You're someone I want to protect, care for, annoy, laugh with, and admire for as long as you'll let me.<br><br>And yes, you're technically older than me 😭 But somehow you'll always be the cute little girl whose smile I can't stop admiring. Not because I think you're small, but because there's a part of my heart that will always look at you with the same wonder I felt the very first time I saw you." },
    { chapter: "Chapter VII", title: "Us", image: "cat-bouquet-glasses.jpg", compact: true, text: "I still want your hand in mine.<br><br>I still want to hear what you're thinking. I still want to know how your day went.<br><br>I still want <strong>you, you, and you only.</strong>" },
    { chapter: "Chapter VIII", title: "The Year We Built", image: "cat-roses-letter.jpg", compact: true, text: "Sometimes I think about that boy sitting in English class, staring at a girl he didn't even know yet.<br><br>If someone had told him that she would become one of the most important people in his life, that he'd bring her a cat plushie, build her a whole Roblox game, memorize her little habits, love holding her hand, and eventually spend an entire year calling her his girlfriend... he probably wouldn't have believed them.<br><br>But here we are. And somehow, one ordinary English class became the beginning of my favorite year." },
    { chapter: "Chapter IX", title: "What I Want", image: "cat-tuxedo-rose.jpg", compact: true, text: "I don't know what every day ahead of us will look like. But I know I want more of them.<br><br>More mornings and late nights. More ridiculous conversations. More laughter. More little surprises. More cats making you ridiculously excited. More moments where I get to hold your hand. More memories that nobody else will understand except us.<br><br>I don't need our future to be very perfect and smooth. I just want it to have <strong>us</strong> in it." },
    { chapter: "Chapter X", title: "The Next Page", image: "kitten-holding-rose.jpg", compact: true, text: "On November 16, 2025, you said yes to me. You probably didn't know what that yes would become. Neither did I.<br><br>I didn't know it would become the person whose hand I'd never want to let go of. The girl I'd still find breathtaking every time I saw her.<br><br>And now, after everything we've lived through, I'm standing at another page. But this time, I'm not asking you to be my girlfriend. You already are.<br><br>I'm asking you something much simpler: <strong>Will you keep turning the pages with me?</strong><br><br>Because if you say yes, I'll still be that same idiot from English class. The one who looked at you and thought, <em>“She's the most beautiful girl I've ever seen.”</em>" },
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
  const compact = page.compact ? " compact" : "";
  return '<div class="page-content' + compact + '"><p class="chapter-label">' + page.chapter + "</p><h2>" + page.title + "</h2><p>" + page.text + "</p>" + image + '<div class="flourish">❦</div></div>' + number;
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

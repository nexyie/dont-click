
var playing = false;
var startTime = 0;
var timer, baitTimer;
var best = localStorage.getItem('dcBest') ? parseFloat(localStorage.getItem('dcBest')) : 0;
document.getElementById('best').innerHTML = best.toFixed(1);

var baits = [
  "free money",
  "click here",
  "ok you can click now",
  "your computer has a virus!!",
  "are you still there?",
  "click to continue",
  "x",
  "last chance to click",
  "nothing happens if you click",
  "you win! click to claim",
  "just one click",
  "dont click this one either",
  "go ahead, its fine",
  "click me",
  "pls click",
  "this is a button",
  "ok you won, click to finish",
    "bet you cant resist",
  "you wont last 10 more seconds",
  "my grandma lasted longer than you",
  "wow you are actually still here",
  "this is too easy for you right?",
  "ok that was a lie, dont click",
  "your best score is embarrassing",
  "clicking would be so satisfying",
  "everyone else clicked by now",
  "you are not even trying",
  "scared to click?",
  "just click it already",
  "i dare you",
  "your finger is twitching, i can tell",
  "the button is RIGHT HERE",
  "nobody is watching, click it",
  "this one is safe, trust me",
  "ok the game is over, you can click",
  "congrats you won! (click to claim)",
  "error 404: self control not found",
  "you already lost, click to confirm",
  "the timer is broken, click to fix",
  "click to stop the timer and save your score",
  "if you click this you win double",
  "ur mouse is lagging, click to refresh",
  "psst. click here",
  "this isnt even a bait",
  "i bet you click in 3 seconds",
  "3... 2... 1... click",
  "dont think about clicking",
  "you thought about clicking just now",
  "try clicking with your other hand",
  "this game is rigged, click to report",
  "your score wont save if you dont click",
  "click to unlock secret level",
  "the real game starts after you click",
  "this is a different game now, click",
  "your friend scored higher than you",
  "my cat has better self control",
  "you call that patience?",
  "boring. click something",
  "this is taking forever, just click",
  "thats it? only that long?",
  "go on, press it, it wont bite",
  "you look like you want to click",
  "free robux (click)",
  "download more ram here",
  "hot singles in your area",
  "you are the 1,000,000th visitor",
  "update available, click to install",
  "your cookies have expired, click to renew",
  "claim your prize before it expires",
  "this tab is lagging, click to close",
  "are you a robot? click to verify",
  "click here to skip ad",
  "ad: nothing. click anyway",
  "the button on the left is better",
  "stop looking at me and click",
  "i can see you hovering",
  "hover all you want, you will click",
  "everyone clicks eventually",
  "your hand is shaking, just do it",
  "game over in 5 seconds unless you click",
  "click now or lose forever",
  "you only have one chance to click",
  "this is the final bait, promise",
  "ok that was the final bait. this is the real final bait",
  "congrats on lasting this long, now click",
  "nobody has ever made it past this point",
  "this is where most people click",
  "you are doing great, click to celebrate",
  "touch grass. click here instead",
  "wow a real one. click to be a fake one",
  "stop being so stubborn",
  "you dont have the guts",
  "all that effort for nothing, click",
  "the game is bugged, click to continue",
  "this isnt a game, its a test of will. click",
  "your patience is overrated",
  "just a tiny click",
  "a little click never hurt anyone",
  "click and ill never bother you again",
  "ill stop if you click",
  "ok im sorry, you can click now",
  "i lied earlier, clicking is good",
  "the other players all clicked",
  "the leaderboard says you lose",
  "your opponent clicked, you win! click to collect",
  "dont worry, the timer is paused. click",
  "this one doesnt count, click",
  "you can click this one, its a different game",
  "press any key (actually click)",
  "tap here to win",
  "boo! did that scare you into clicking?",
  "look behind you (then click)",
  "your battery is at 1%. click to save",
  "someone is typing... click to see",
  "you have 1 new message. click to open",
  "ur not gonna make it",
  "ok seriously, click. nothing bad happens"
];

function start() {
  playing = true;
  startTime = Date.now();
  document.getElementById('main').innerHTML = "dont click";
  document.getElementById('btn').style.display = "none";
  timer = setInterval(function () {
    var t = (Date.now() - startTime) / 1000;
    document.getElementById('time').innerHTML = t.toFixed(1);
  }, 100);
  nextBait();
}

function nextBait() {
  var t = (Date.now() - startTime) / 1000;
  var wait = Math.max(600, 3500 - t * 80);
  baitTimer = setTimeout(function () {
    if (!playing) return;
    makeBait();
    nextBait();
  }, wait);
}

function makeBait() {
  var s = document.createElement('span');
  s.className = 'bait';
  s.innerHTML = baits[Math.floor(Math.random() * baits.length)];
  s.style.position = "absolute";
  s.style.left = Math.floor(Math.random() * (window.innerWidth - 220)) + "px";
  s.style.top = Math.floor(120 + Math.random() * (window.innerHeight - 200)) + "px";
  s.style.cursor = "pointer";
  s.style.border = "1px solid black";
  s.style.padding = "4px";
  s.style.background = "#ddd";
  document.body.appendChild(s);
  setTimeout(function () {
    if (s.parentNode) s.parentNode.removeChild(s);
  }, 2500);
}

function lose() {
  playing = false;
  clearInterval(timer);
  clearTimeout(baitTimer);
  var t = (Date.now() - startTime) / 1000;
  var baitEls = document.getElementsByClassName('bait');
  while (baitEls.length > 0) baitEls[0].parentNode.removeChild(baitEls[0]);
  document.getElementById('main').innerHTML = "you clicked";
  document.getElementById('time').innerHTML = "you lasted " + t.toFixed(1) + " sec";
  if (t > best) {
    best = t;
    localStorage.setItem('dcBest', best);
    document.getElementById('best').innerHTML = best.toFixed(1);
  }
  document.getElementById('btn').innerHTML = "try again";
  document.getElementById('btn').style.display = "inline";
}

document.onclick = function (e) {
  if (!playing) return;
  if (e.target.id == 'btn') return;
  lose();
};

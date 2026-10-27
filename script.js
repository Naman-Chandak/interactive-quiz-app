(function () {
  "use strict";

  var QUESTIONS = [
    { q: "Which Pokémon is number 025 in the National Pokédex?",
      options: ["Pikachu", "Raichu", "Pichu", "Meowth"], answer: "Pikachu",
      fact: "Pikachu is No. 025. Its evolution, Raichu, is No. 026." },
    { q: "Charizard is a Fire type. What is its second type?",
      options: ["Dragon", "Flying", "Ground", "Rock"], answer: "Flying",
      fact: "Charizard is Fire/Flying. Only Mega Charizard X becomes Fire/Dragon." },
    { q: "What does Charmander evolve into at level 16?",
      options: ["Charizard", "Charmeleon", "Charjabug", "Charcadet"], answer: "Charmeleon",
      fact: "Charmander becomes Charmeleon at level 16 and Charizard at level 36." },
    { q: "Which type is super effective against Water-type Pokémon?",
      options: ["Fire", "Grass", "Ground", "Ice"], answer: "Grass",
      fact: "Grass moves hit Water types for double damage. Electric moves do too." },
    { q: "Who is the Pokémon Professor of Pallet Town?",
      options: ["Professor Elm", "Professor Birch", "Professor Oak", "Professor Rowan"], answer: "Professor Oak",
      fact: "Professor Oak studies Pokémon in Pallet Town in the Kanto region." },
    { q: "How many Pokémon were in the original Generation 1 Pokédex?",
      options: ["100", "151", "251", "386"], answer: "151",
      fact: "Generation 1 ran from Bulbasaur (No. 001) to Mew (No. 151)." },
    { q: "Which sleepy Pokémon is famous for blocking roads?",
      options: ["Slowpoke", "Jigglypuff", "Snorlax", "Munchlax"], answer: "Snorlax",
      fact: "Snorlax sleeps most of the day and often blocks the path in Kanto." },
    { q: "Which Eevee evolution do you get with a Water Stone?",
      options: ["Jolteon", "Flareon", "Espeon", "Vaporeon"], answer: "Vaporeon",
      fact: "Water Stone gives Vaporeon, Thunder Stone gives Jolteon and Fire Stone gives Flareon." },
    { q: "Which Kanto starter is a Grass type?",
      options: ["Squirtle", "Bulbasaur", "Charmander", "Chikorita"], answer: "Bulbasaur",
      fact: "Bulbasaur is Grass/Poison and holds the very first Pokédex number, 001." },
    { q: "Mewtwo was created from the DNA of which Pokémon?",
      options: ["Ditto", "Arceus", "Mew", "Celebi"], answer: "Mew",
      fact: "Mewtwo is a clone made from Mew's DNA." }
  ];

  var RANKS = [
    { min: 9, title: "Pokémon Master", msg: "Almost perfect. Professor Oak would be proud." },
    { min: 7, title: "Elite Trainer", msg: "Strong knowledge. One more round for a perfect score?" },
    { min: 4, title: "Gym Trainer", msg: "A solid start. Try again to climb the ranks." },
    { min: 0, title: "Rookie Trainer", msg: "Every Master started here. Play again and beat your score." }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var startScreen = $("start-screen"), quizScreen = $("quiz-screen"), resultScreen = $("result-screen");
  var progressText = $("progress-text"), scoreText = $("score-text");
  var bar = $("bar"), barFill = $("bar-fill");
  var questionEl = $("question"), optionsEl = $("options");
  var feedbackEl = $("feedback"), nextBtn = $("next-btn");

  var order = [], index = 0, score = 0, answered = false;

  function shuffle(list) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function show(screen) {
    [startScreen, quizScreen, resultScreen].forEach(function (s) { s.hidden = s !== screen; });
  }

  function startQuiz() {
    order = shuffle(QUESTIONS);
    index = 0;
    score = 0;
    show(quizScreen);
    renderQuestion();
  }

  function renderQuestion() {
    var item = order[index];
    answered = false;
    progressText.textContent = "Question " + (index + 1) + " of " + order.length;
    scoreText.textContent = "Score: " + score;
    bar.setAttribute("aria-valuenow", String(index));
    barFill.style.width = (index / order.length * 100) + "%";
    questionEl.textContent = item.q;
    feedbackEl.textContent = "";
    nextBtn.hidden = true;
    nextBtn.textContent = index === order.length - 1 ? "See result" : "Next question";

    optionsEl.innerHTML = "";
    shuffle(item.options).forEach(function (text, i) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.setAttribute("data-value", text);
      var key = document.createElement("span");
      key.className = "option__key";
      key.textContent = String(i + 1);
      key.setAttribute("aria-hidden", "true");
      var label = document.createElement("span");
      label.className = "option__label";
      label.textContent = text;
      btn.appendChild(key);
      btn.appendChild(label);
      btn.addEventListener("click", function () { choose(btn); });
      li.appendChild(btn);
      optionsEl.appendChild(li);
    });
    questionEl.focus();
  }

  function choose(btn) {
    if (answered) return;
    answered = true;
    var item = order[index];
    var picked = btn.getAttribute("data-value");
    var correct = picked === item.answer;
    if (correct) score++;
    scoreText.textContent = "Score: " + score;

    Array.prototype.forEach.call(optionsEl.querySelectorAll(".option"), function (b) {
      b.disabled = true;
      var value = b.getAttribute("data-value");
      if (value === item.answer) b.classList.add("is-correct");
      else if (b === btn) b.classList.add("is-wrong");
    });

    feedbackEl.textContent = "";
    var lead = document.createElement("strong");
    lead.textContent = correct ? "Correct! " : "Not quite. The answer is " + item.answer + ". ";
    feedbackEl.appendChild(lead);
    feedbackEl.appendChild(document.createTextNode(item.fact));

    nextBtn.hidden = false;
    nextBtn.focus();
  }

  function next() {
    if (!answered) return;
    index++;
    if (index < order.length) renderQuestion();
    else showResult();
  }

  function showResult() {
    var rank = RANKS.filter(function (r) { return score >= r.min; })[0];
    $("final-score").textContent = score + " / " + order.length;
    $("final-rank").textContent = rank.title;
    $("final-message").textContent = rank.msg;
    barFill.style.width = "100%";
    show(resultScreen);
    $("restart-btn").focus();
  }

  $("start-btn").addEventListener("click", startQuiz);
  $("restart-btn").addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", next);

  document.addEventListener("keydown", function (e) {
    if (quizScreen.hidden) return;
    if (e.key >= "1" && e.key <= "4" && !answered) {
      var btns = optionsEl.querySelectorAll(".option");
      var target = btns[Number(e.key) - 1];
      if (target) choose(target);
    }
  });
})();

# Pokémon Trivia Quiz (Interactive Quiz Application)

A 10-question Pokémon quiz built with plain HTML, CSS and JavaScript. Built in Lecture 10 and part of my portfolio: https://github.com/Naman-Chandak

**Live app:** https://interactive-quiz-app-amber.vercel.app

## Features

- 10 multiple-choice questions, shuffled every game (answer options are shuffled too)
- Instant feedback after each answer, with a short fact about the correct answer
- Progress bar and live score
- Final score with a trainer rank: Rookie Trainer, Gym Trainer, Elite Trainer or Pokémon Master
- Play again button
- Keyboard support: press 1 to 4 to answer, Enter for the next question
- Works on phones and desktops

## Technologies

HTML, CSS, JavaScript (no libraries). Pixel fonts: Press Start 2P and VT323 (SIL Open Font License), included in `assets/fonts`.

## How it works

- `index.html` holds three screens: start, question and result. Only one is visible at a time.
- `script.js` keeps the questions in an array of objects (`q`, `options`, `answer`, `fact`), shuffles them, checks each pick against `answer`, adds one point for a correct pick and shows the rank at the end.
- Answer text is inserted with `textContent`, so no question text is ever treated as HTML.

## Run it locally

No install needed. Download the folder and double-click `index.html`.

## Add your own questions

Open `script.js` and add an object to the `QUESTIONS` array:

```js
{ q: "Your question?", options: ["A", "B", "C", "D"], answer: "B", fact: "Short fact." }
```

`answer` must exactly match one of the four options.

## Disclaimer

Fan-made practice project. Pokémon is a trademark of Nintendo, Game Freak and The Pokémon Company. This project is not affiliated with or endorsed by them and uses no official artwork.

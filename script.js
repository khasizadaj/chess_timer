// handle options
const options = document.querySelectorAll('.option');
let selectedOption;

let updateStateOfOption = (option) => {
  option.addEventListener('click', (e) => {
    clearSelectedOptions();
    option.classList.add('selected');
    selectedOption = option;
  });
};

let clearSelectedOptions = () => {
  options.forEach((option) => {
    option.classList.remove('selected');
  });
};

options.forEach((option) => updateStateOfOption(option));

/* 
TIMER
*/

const timers = document.querySelectorAll('.single-timer');
const startBtn = document.querySelector('.btn.start');

startBtn.addEventListener('click', () => {
  const timerBody = document.querySelector('.timer-body');
  const optionsBody = document.querySelector('.options');

  if (selectedOption == null) {
    console.error('No option is selected.');
    return;
  }
  // hide or show elements
  timerBody.classList.remove('hide');
  optionsBody.classList.add('hide');
  startBtn.classList.add('hide');

  // start respective timer
  let timerType = selectedOption.querySelector('p').textContent;
  runTimer(timerType);
});

class SingleTimer {
  minutes = 0;
  seconds = 0;
  toString() {
    let minutesAsString = this.minutes.toString().padStart(2, '0');
    let secondsAsString = this.seconds.toString().padStart(2, '0');
    return `${minutesAsString}:${secondsAsString}`;
  }
}

class ChessTimer {
  currSingleTimer = {
    element: timers[0],
    object: new SingleTimer(),
  };

  constructor(gameLength, incremementLength) {
    this.gameLength = gameLength;
    this.incremementLength = incremementLength;
  }

  setInitialTime = () => {
    timers.forEach((timer) => {
      let gameInSeconds = this.gameLength * 60;
      timer.querySelector('p').textContent =
        updateTimer(gameInSeconds).toString();
    });
    console.log(this.currSingleTimer);
  };

  startTimer = () => {
    // TODO start and run timer
    console.log('Started timer.');
  };
}

const runTimer = (timerType) => {
  let lengthOfGame;
  let lengthOfIncrement;
  switch (timerType) {
    case '5 + 3':
      lengthOfGame = 5; // minutes
      lengthOfIncrement = 3; // seconds
      break;
    case '10 + 5':
      lengthOfGame = 10; // minutes
      lengthOfIncrement = 5; // seconds
      break;
    case '15 + 10':
      lengthOfGame = 15; // minutes
      lengthOfIncrement = 10; // seconds
      break;
  }
  let chessTimer = new ChessTimer(lengthOfGame, lengthOfIncrement);
  chessTimer.setInitialTime();
  chessTimer.startTimer();
};

const updateTimer = (seconds) => {
  let timer = new SingleTimer();
  timer.minutes = Math.floor(seconds / 60);
  timer.seconds = seconds - timer.minutes * 60;

  return timer;
};

import { COLORS } from "../resource/colors.js";
import { START_POSITION } from "../resource/position.js";


export class Player {
  constructor(color, board) {
    this.color = color;
    this.board = board;
    this.totalTime = START_POSITION.time; 
    this.timer = this.totalTime;
    this.timerInterval = null;
    

    this.updateTimer();
  }

  setTotalTime(newTotalTime) {
    this.totalTime = newTotalTime;
    this.timer = newTotalTime;
    this.updateTimer(); 
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--;
      this.updateTimer();

      if (this.timer === 0) {
        this.stopTimer();
        this.color === COLORS.white ? this.board.showWinModal(COLORS.black) : this.board.showWinModal(COLORS.white)
        
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  updateTimer() {
    const timerElement = document.getElementById(`${this.color}-timer`);
    if (timerElement) {
      timerElement.textContent = this.formatTime();
    }
  }

  formatTime() {
    const minutes = Math.floor(this.timer / 60);
    const remainingSeconds = this.timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
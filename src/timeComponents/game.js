import { Player } from './player.js'
import { COLORS } from '../resource/colors.js'
import { START_POSITION } from '../resource/position.js'

export class Game {
  constructor(name, board) {
    this.players = {
      white: new Player(COLORS.white, board),
      black: new Player(COLORS.black, board),
    }
    this.currentPlayer = COLORS.white
    this.name = name
    this.isPausedFlag = false
  }

  switchPlayer() {
    this.players[this.currentPlayer].stopTimer()
    this.currentPlayer =
      this.currentPlayer === COLORS.white ? COLORS.black : COLORS.white
    this.players[this.currentPlayer].startTimer()
  }

  finish() {
    this.stop()
    this.updateTimersToLimit(START_POSITION.time)
  }

  stop() {
    this.players[COLORS.white].stopTimer()
    this.players[COLORS.black].stopTimer()
  }

  pause() {
    this.isPausedFlag = true
    this.stop()
  }

  resume() {
    this.isPausedFlag = false
    this.players[this.currentPlayer].startTimer()
  }

  isPaused() {
    return this.isPausedFlag
  }

  updateTimersToLimit(limitInSeconds) {
    Object.values(this.players).forEach((player) => {
      player.setTotalTime(limitInSeconds)
      player.updateTimer()
    })
  }
}

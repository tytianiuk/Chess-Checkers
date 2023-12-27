import Board from './board/board.js'
import { Game } from './timeComponents/game.js'
import { START_POSITION } from './resource/position.js'
import { STRINGS } from './resource/string.js'

const chess = document.querySelector('.chess')
const checkers = document.querySelector('.checkers')
const panelIcons = document.querySelector('.panel-icons')
const boardContainer = document.querySelector('.board')
const backButtons = document.querySelectorAll('.back')
const fillButtons = document.querySelectorAll('.fill')
const pauseButton = document.querySelector('.pause')
const turnMoveImage = document.querySelector('.turn-move')
const winModal = document.querySelector('.win-modal')
const pausePanel = document.querySelector('.pause-panel')

var board = null

chess.addEventListener(STRINGS.click, () => {
  board = new Board(boardContainer, START_POSITION.size, turnMoveImage)
  const game = new Game(STRINGS.chess, board)
  board.game = game
  board.addFigures()
  panelIcons.classList.add(STRINGS.hide)
  board.initialization()
})

checkers.addEventListener(STRINGS.click, () => {
  board = new Board(boardContainer, START_POSITION.size, turnMoveImage)
  const game = new Game(STRINGS.checkers, board)
  board.game = game
  board.addFigures()
  panelIcons.classList.add(STRINGS.hide)
  board.initialization()
})

pauseButton.addEventListener(STRINGS.click, () => {
  if (board) {
    if (board.game.isPaused()) {
      pausePanel.classList.add(STRINGS.hide)
      board.game.resume()
    } else {
      pausePanel.classList.remove(STRINGS.hide)
      board.game.pause()
    }
  }
})

backButtons.forEach((button) => {
  button.addEventListener(STRINGS.click, () => {
    if (board) {
      winModal.classList.add(STRINGS.hide)
      pausePanel.classList.add(STRINGS.hide)
      board.hide()
      board.game.finish()
      board = null
      panelIcons.classList.remove(STRINGS.hide)
    }
  })
})

fillButtons.forEach((button) => {
  button.addEventListener(STRINGS.click, () => {
    if (board) {
      winModal.classList.add(STRINGS.hide)
      pausePanel.classList.add(STRINGS.hide)
      board.game.finish()
      board.clear()
      board.addFigures()
      board.initialization()
    }
  })
})

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

chess.addEventListener('click', () => {
  board = new Board(boardContainer, START_POSITION.size, turnMoveImage)
  const game = new Game(STRINGS.chess, board)
  board.game = game
  board.addFigures()
  panelIcons.classList.add('hide')
  board.initialization()
})

checkers.addEventListener('click', () => {
  board = new Board(boardContainer, START_POSITION.size, turnMoveImage)
  const game = new Game(STRINGS.checkers, board)
  board.game = game
  board.addFigures()
  panelIcons.classList.add('hide')
  board.initialization()
})

pauseButton.addEventListener('click', () => {
  if (board) {
    if (board.game.isPaused()) {
      pausePanel.classList.add('hide')
      board.game.resume()
    } else {
      pausePanel.classList.remove('hide')
      board.game.pause()
    }
  }
})

backButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (board) {
      winModal.classList.add('hide')
      pausePanel.classList.add('hide')
      board.hide()
      board.game.finish()
      board = null
      panelIcons.classList.remove('hide')
    }
  })
})

fillButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (board) {
      winModal.classList.add('hide')
      pausePanel.classList.add('hide')
      board.game.finish()
      board.clear()
      board.addFigures()
      board.initialization()
    }
  })
})

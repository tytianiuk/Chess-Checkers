import Cell from './cell.js'
import { COLORS } from '../resource/colors.js'
import { FIGURES } from '../resource/figures.js'
import { START_POSITION } from '../resource/position.js'
import { STRINGS } from '../resource/string.js'

export default class Board {
  constructor(context, size, turnMoveImage) {
    this.size = size
    this.context = context
    this.cells = this.create(size, size)
    this.pickedCell = null
    this.turnMove = COLORS.white
    this.turnMoveImage = turnMoveImage
    this.game = null
    this.canMultiBeat = null
  }

  // base methods of the board

  create(x, y) {
    const cells = []
    for (let j = 0; j < y; j++) {
      const row = []
      for (let i = 0; i < x; i++) {
        const cell = new Cell(i, j, this)
        row.push(cell)
      }
      cells.push(row)
    }
    return cells
  }

  initialization() {
    this.context.innerHTML = ''
    for (const row of this.cells) {
      const rowHTML = document.createElement('div')
      rowHTML.className = 'row'
      for (const cell of row) {
        const cellHTML = cell.initialization()
        if (cell.figure) {
          cellHTML.append(cell.figure.HTML)
        }
        rowHTML.append(cellHTML)
      }
      this.context.prepend(rowHTML)
    }
    this.show()
  }

  show() {
    this.context.classList.remove(STRINGS.hide)
    this.changeSrc()
  }

  hide() {
    this.context.classList.add(STRINGS.hide)
    this.turnMoveImage.src = STRINGS.empty
  }

  clear() {
    for (const row of this.cells) {
      for (const cell of row) {
        cell.figure = null
        cell.isSelected = false
        cell.isPicked = false
      }
    }
    this.turnMove = COLORS.white
    this.pickedCell = null
    this.turnMoveImage.src = STRINGS.whiteKingSrc
  }

  // method add figures on the board

  addFigures() {
    const splitedPosition =
      this.game.name === STRINGS.chess
        ? START_POSITION.positionChess.split('/')
        : START_POSITION.positionCheckers.split('/')
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const currentFigure = FIGURES[splitedPosition[y][x]]
        if (currentFigure !== null) {
          this.cells[y][x].figure = currentFigure.createFigure(this.cells)
        } else this.cells[y][x].figure = null
      }
    }
    this.game.players.white.startTimer()
  }

  // method deselect all cells on board

  deselectAllCells() {
    for (const row of this.cells) {
      for (const cell of row) {
        if (cell.isSelected) cell.deselect()
        if (cell.isPicked) cell.unpick()
      }
    }
  }

  // method to try move figure

  tryMove(startCell, endCell) {
    this.pickedCell = null
    if (!this.checkTurnMove(startCell)) {
      this.deselectAllCells()
      return
    }
    const canMove = startCell.figure.canMove(startCell, endCell)

    if (!canMove) return

    startCell.figure.move(startCell, endCell)
    this.initialization()
    this.changeTurnMove()
    this.game.switchPlayer()
    this.checkWin()
  }

  //methods change turn move

  changeTurnMove() {
    this.turnMove = this.turnMove === COLORS.white ? COLORS.black : COLORS.white
    this.changeSrc()
  }

  checkTurnMove(startCell) {
    return startCell.figure.color === this.turnMove
  }

  changeSrc() {
    if (STRINGS.whiteKingSrc.includes(this.turnMove)) {
      this.turnMoveImage.src =
        this.game.name === STRINGS.chess
          ? STRINGS.whiteKingSrc
          : STRINGS.whiteCheckerSrc
    } else
      this.turnMoveImage.src =
        this.game.name === STRINGS.chess
          ? STRINGS.blackKingSrc
          : STRINGS.blackCheckerSrc
  }

  //methods show another modals

  showTransModal() {
    return new Promise((resolve) => {
      const transModal = document.querySelector('.transformation-modal')
      const transButtons = Array.from(
        document.querySelectorAll('.transformation-button'),
      )

      transModal.classList.remove(STRINGS.hide)

      transButtons.forEach((button) => {
        button.addEventListener(STRINGS.click, () => {
          transModal.classList.add(STRINGS.hide)
          resolve(button.id)
        })
      })
    })
  }

  showWinModal(winColor) {
    const winModal = document.querySelector('.win-modal')
    const winText = document.querySelector('.win-text')
    winText.textContent = `${winColor.toUpperCase()} ${STRINGS.wins}`
    this.game.finish()
    winModal.classList.remove(STRINGS.hide)
  }

  //win methods

  checkWin() {
    this.game.name === STRINGS.chess
      ? this.checkWinForChess()
      : this.checkWinForCheckers()
  }

  checkWinForChess() {
    const kings = []
    for (const row of this.cells) {
      for (const cell of row) {
        if (!cell.figure) continue
        if (cell.figure.type === STRINGS.king) {
          kings.push(cell.figure)
        }
      }
    }

    if (kings.length === 1) {
      this.showWinModal(kings[0].color)
      return
    }
  }

  checkWinForCheckers() {
    const whiteCheckers = []
    const blackCheckers = []
    for (const row of this.cells) {
      for (const cell of row) {
        if (!cell.figure) continue
        if (cell.figure.color === COLORS.white) {
          whiteCheckers.push(cell.figure)
        } else blackCheckers.push(cell.figure)
      }
    }
    if (whiteCheckers.length < 1) {
      this.showWinModal(blackCheckers[0].color)
      return
    }
    if (blackCheckers.length < 1) {
      this.showWinModal(whiteCheckers[0].color)
      return
    }
  }
}

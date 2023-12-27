import { COLORS } from '../resource/colors.js'
import { STRINGS } from '../resource/string.js'

export default class Cell {
  constructor(x, y, board) {
    this.x = x
    this.y = y
    this.color = this.setColor()
    this.board = board
    this.figure = null
    this.HTML = null
    this.isSelected = false
    this.isPicked = false
  }

  initialization() {
    this.HTML = document.createElement('div')
    this.HTML.className = `cell ${this.color}`

    this.HTML.addEventListener(STRINGS.click, (event) => {
      if (event.altKey) {
        this.handleAltKey()
      } else if (!this.figure && !this.board.pickedCell) {
        this.handleEmptyCell()
      } else if (this.isPicked) {
        this.handlePickedCell()
      } else {
        this.handleNonPickedCell()
      }
    })

    return this.HTML
  }

  // click validation methods

  handleAltKey() {
    this.isSelected ? this.deselect() : this.select()
  }

  handleEmptyCell() {
    this.board.deselectAllCells()
    this.pickedCell = null
  }

  handlePickedCell() {
    this.unpick()
    this.board.pickedCell = null
  }

  handleNonPickedCell() {
    this.board.deselectAllCells()

    if (this.board.pickedCell !== this && this.board.pickedCell) {
      this.board.tryMove(this.board.pickedCell, this)
    } else if (this.board.checkTurnMove(this)) {
      this.board.pickedCell = this
      this.pick()
    }
  }

  // cell modification methods

  setColor() {
    return (this.x + this.y) % 2 === 0 ? COLORS.black : COLORS.white
  }

  select() {
    this.HTML.classList.add(STRINGS.selected)
    this.isSelected = !this.isSelected
  }

  deselect() {
    this.HTML.classList.remove(STRINGS.selected)
    this.isSelected = !this.isSelected
  }

  pick() {
    this.HTML.classList.add(STRINGS.picked)
    this.isPicked = !this.isPicked
  }

  unpick() {
    this.HTML.classList.remove(STRINGS.picked)
    this.isPicked = !this.isPicked
  }
}

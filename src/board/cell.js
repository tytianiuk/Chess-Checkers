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
    this.HTML.className = `cell ${this.color} ${this.HTML}`
    this.HTML.addEventListener('click', (event) => {
      if (event.altKey) {
        this.isSelected ? this.deselect() : this.select()
        return
      }

      if (!this.figure && !this.board.pickedCell) {
        this.board.deselectAllCells()
        this.pickedCell = null
        return
      }

      if (this.isPicked) {
        this.unpick()
        this.board.pickedCell = null
      } else {
        this.board.deselectAllCells()
        if (this.board.pickedCell !== this && this.board.pickedCell) {
          this.board.tryMove(this.board.pickedCell, this)
          return
        }
        if (this.board.checkTurnMove(this)) {
          this.board.pickedCell = this
          this.pick()
        }
      }
    })
    return this.HTML
  }

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

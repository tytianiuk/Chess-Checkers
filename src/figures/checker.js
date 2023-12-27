import { COLORS } from '../resource/colors.js'
import { START_POSITION } from '../resource/position.js'
import Figure from './figure.js'

export class Checker extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells)
    this.canMultiBeat = null
  }

  canMove(startCell, endCell) {
    const dx = startCell.x - endCell.x
    const dy = startCell.y - endCell.y

    if (startCell.board.canMultiBeat === null) {
      if (
        Math.abs(dx) === START_POSITION.moveLengthChecker &&
        Math.abs(dy) === START_POSITION.moveLengthChecker
      ) {
        return this.canDoMove(startCell, endCell, dy)
      }

      if (
        Math.abs(dx) === START_POSITION.jumpLengthChecker &&
        Math.abs(dy) === START_POSITION.jumpLengthChecker
      ) {
        if (this.canBeat(startCell, endCell, dx, dy)) {
          this.performBeat(startCell, endCell)
          return this.checkMultiBeat(endCell)
        }
        return false
      }
    }

    if (
      Math.abs(dx) === START_POSITION.jumpLengthChecker &&
      Math.abs(dy) === START_POSITION.jumpLengthChecker
    ) {
      if (this.canBeat(startCell.board.canMultiBeat, endCell, dx, dy)) {
        this.performBeat(startCell.board.canMultiBeat, endCell)
        return this.checkMultiBeat(endCell)
      }
    }
    return false
  }

  canDoMove(startCell, endCell, dy) {
    if (startCell.figure.color === COLORS.white && dy < 0) {
      return this.isFreeCell(endCell)
    } else if (startCell.figure.color !== COLORS.white && dy > 0) {
      return this.isFreeCell(endCell)
    }
  }

  canBeat(startCell, endCell, dx, dy) {
    if (
      Math.abs(dx) !== START_POSITION.jumpLengthChecker ||
      Math.abs(dy) !== START_POSITION.jumpLengthChecker
    )
      return false
    const cellY = startCell.y - dy / START_POSITION.jumpLengthChecker
    const cellX = startCell.x - dx / START_POSITION.jumpLengthChecker
    const cell = this.cells[cellY][cellX]
    if (!cell.figure) return false
    if (
      startCell.figure.color !== cell.figure.color &&
      this.isFreeCell(endCell)
    ) {
      cell.figure = null
      return true
    }
    return false
  }

  cheakBeat(startCell, endCell, dx, dy) {
    const cellY = startCell.y + dy / START_POSITION.jumpLengthChecker
    const cellX = startCell.x + dx / START_POSITION.jumpLengthChecker
    const cell = this.cells[cellY][cellX]
    if (!cell.figure) return false
    if (
      startCell.figure.color !== cell.figure.color &&
      this.isFreeCell(endCell)
    ) {
      return true
    }
    return false
  }

  isFreeCell(endCell) {
    return endCell.figure === null
  }

  isEnemy(startCell, cell) {
    if (this.isFreeCell(startCell) || this.isFreeCell(cell)) return true
    return startCell.figure.color !== cell.figure.color
  }

  canBeatInAnyDirection(cell) {
    const directions = [
      {
        dx: START_POSITION.jumpLengthChecker,
        dy: START_POSITION.jumpLengthChecker,
      },
      {
        dx: -START_POSITION.jumpLengthChecker,
        dy: START_POSITION.jumpLengthChecker,
      },
      {
        dx: START_POSITION.jumpLengthChecker,
        dy: -START_POSITION.jumpLengthChecker,
      },
      {
        dx: -START_POSITION.jumpLengthChecker,
        dy: -START_POSITION.jumpLengthChecker,
      },
    ]

    const isWithinBounds = (x, y) =>
      x >= 0 && x < START_POSITION.size && y >= 0 && y < START_POSITION.size

    return directions.some((direction) => {
      const { dx, dy } = direction
      const cellForJumpX = cell.x + dx
      const cellForJumpY = cell.y + dy

      if (isWithinBounds(cellForJumpX, cellForJumpY)) {
        const cellForJump = this.cells[cellForJumpY][cellForJumpX]
        return this.cheakBeat(cell, cellForJump, dx, dy)
      }

      return false
    })
  }

  performBeat(startCell, endCell) {
    endCell.figure = startCell.figure
    startCell.figure = null
    endCell.board.initialization()
  }

  checkMultiBeat(endCell) {
    if (!this.canBeatInAnyDirection(endCell)) {
      endCell.board.canMultiBeat = null
      this.transformation(endCell)
      endCell.board.initialization()
      endCell.board.changeTurnMove()
      endCell.board.game.switchPlayer()
      return false
    }
    endCell.board.canMultiBeat = endCell
    return false
  }
}

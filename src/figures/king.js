import { START_POSITION } from '../resource/position.js'
import { STRINGS } from '../resource/string.js'
import Figure from './figure.js'

export class King extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells)
  }

  canMove(startCell, endCell) {
    if (endCell.figure !== null && endCell.figure.type === STRINGS.rook) {
      this.castle(startCell, endCell)
      return false
    }

    if (!this.isEnemyFigure(startCell, endCell)) return false

    const dx = Math.abs(startCell.x - endCell.x)
    const dy = Math.abs(startCell.y - endCell.y)

    const verticalMove = dx == 0 && dy == 1
    const horizontalMove = dx == 1 && dy == 0
    const diagonalMove = dx == 1 && dy == 1

    return verticalMove || horizontalMove || diagonalMove
  }

  castle(startCell, endCell) {
    if (!this.canCastle(startCell, endCell)) {
      return false
    }

    const direction = startCell.x - endCell.x < 0 ? 1 : -1

    this.moveFigureTo(
      startCell,
      startCell.x + direction * START_POSITION.castleJumpKing,
      startCell.figure,
    )
    this.moveFigureTo(
      startCell,
      startCell.x + direction * START_POSITION.castleJumpRook,
      endCell.figure,
    )

    startCell.figure.isFirstMove = false
    endCell.figure = null
    startCell.figure = null

    startCell.board.initialization()
    startCell.board.changeTurnMove()
    startCell.board.game.switchPlayer()
  }

  moveFigureTo(cellFrom, xTo, figure) {
    this.cells[cellFrom.y][xTo].figure = figure
  }

  canCastle(startCell, endCell) {
    if (!startCell.figure.isFirstMove || !endCell.figure.isFirstMove)
      return false
    if (endCell.figure.type !== STRINGS.rook) return false
    return this.checkCastelingPath(startCell, endCell)
  }

  checkCastelingPath(startCell, endCell) {
    const minX = Math.min(startCell.x, endCell.x)
    const maxX = Math.max(startCell.x, endCell.x)

    for (let x = minX + 1; x < maxX; x++) {
      if (this.cells[startCell.y][x].figure) {
        return false
      }
    }
    return true
  }
}

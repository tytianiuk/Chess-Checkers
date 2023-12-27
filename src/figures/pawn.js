import { COLORS } from '../resource/colors.js'
import { START_POSITION } from '../resource/position.js'
import Figure from './figure.js'

export class Pawn extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells)
  }

  canMove(startCell, endCell) {
    const dx = Math.abs(startCell.x - endCell.x)
    const dy = startCell.y - endCell.y

    const canBeat = this.canBeat(startCell, endCell, dx, dy)
    const canMove = this.canDoMove(startCell, endCell, dx, dy)

    return canBeat || canMove
  }

  canBeat(startCell, endCell, dx, dy) {
    return this.isEnemyFigure(startCell, endCell) && dx === 1 && Math.abs(dy) === 1;
  }

  canDoMove(startCell, endCell, dx, dy) {
    if (startCell.figure.color === COLORS.white && dy < 0 && !endCell.figure) {
      return (
        (dx == 0 && dy == -1) ||
        (dx == 0 &&
          dy == -START_POSITION.doubleMovePawn &&
          startCell.figure.isFirstMove)
      )
    } else if (
      startCell.figure.color !== COLORS.white &&
      dy > 0 &&
      !endCell.figure
    ) {
      return (
        (dx == 0 && dy == 1) ||
        (dx == 0 &&
          dy == START_POSITION.doubleMovePawn &&
          startCell.figure.isFirstMove)
      )
    }
  }

  isEnemyFigure(startCell, endCell) {
    if (endCell.figure === null) return false
    return startCell.figure.color !== endCell.figure.color
  }
}

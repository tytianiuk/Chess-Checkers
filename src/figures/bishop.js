import Figure from './figure.js'

export class Bishop extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells)
  }

  canMove(startCell, endCell) {
    const dx = Math.abs(startCell.x - endCell.x)
    const dy = Math.abs(startCell.y - endCell.y)
    const diagonalMove = this.checkEmptyDiagonal(startCell, endCell, dx, dy)

    return diagonalMove
  }
}

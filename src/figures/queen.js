import Figure from './figure.js'

export class Queen extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells)
  }

  canMove(startCell, endCell) {
    const dx = Math.abs(startCell.x - endCell.x)
    const dy = Math.abs(startCell.y - endCell.y)

    const verticalMove = dx === 0 && this.checkEmptyVertical(startCell, endCell)
    const horizontalMove =
      dy === 0 && this.checkEmptyHorizontal(startCell, endCell)
    const diagonalMove = this.checkEmptyDiagonal(startCell, endCell, dx, dy)

    return verticalMove || horizontalMove || diagonalMove
  }
}

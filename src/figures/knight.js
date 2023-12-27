import Figure from './figure.js'

export class Knight extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells)
  }

  canMove(startCell, endCell) {
    if (!this.isEnemyFigure(startCell, endCell)) return false
    const dx = Math.abs(startCell.x - endCell.x)
    const dy = Math.abs(startCell.y - endCell.y)

    return (dx == 1 && dy == 2) || (dx == 2 && dy == 1)
  }
}

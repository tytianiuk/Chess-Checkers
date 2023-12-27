import Figure from './figure.js'

export class Damka extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells)
  }

  canMove(startCell, endCell) {
    const dx = startCell.x - endCell.x
    const dy = startCell.y - endCell.y

    if (startCell.board.canMultiBeat) return false

    return this.checkEmptyDiagonal(
      startCell,
      endCell,
      Math.abs(dx),
      Math.abs(dy),
    )
  }

  isFreeCell(endCell) {
    return endCell.figure === null
  }

  isEnemy(startCell, cell) {
    return startCell.figure.color !== cell.figure.color
  }

  checkEmptyDiagonal(startCell, endCell, dx, dy) {
    if (dy !== dx) {
      return false
    }

    const xDirection = endCell.x > startCell.x ? 1 : -1
    const yDirection = endCell.y > startCell.y ? 1 : -1
    const listEnemy = []

    for (let i = 1; i < dx; i++) {
      const currentFigure =
        this.cells[i * yDirection + startCell.y][i * xDirection + startCell.x]
          .figure

      if (currentFigure) {
        listEnemy.push(currentFigure.color)

        if (listEnemy.length > 1) {
          return false
        }
      }
    }

    if (listEnemy.length === 1 && listEnemy[0] !== startCell.figure.color) {
      for (let i = 1; i < dx; i++) {
        const cell =
          this.cells[i * yDirection + startCell.y][i * xDirection + startCell.x]
        cell.figure = null
      }

      return true
    }

    return false
  }
}

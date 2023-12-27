import Figure from "./figure.js";

export class Damka extends Figure {
  constructor(src, type, cells) {
    super(src, type, cells);
  }

  canMove(startCell, endCell) {
    const dx = startCell.x - endCell.x;
    const dy = startCell.y - endCell.y;
    if(startCell.board.canMultiBeat) return false;
    const diagonalMove = this.checkEmptyDiagonal(startCell, endCell, Math.abs(dx), Math.abs(dy));
    return diagonalMove;
  }

  isFreeCell(endCell){
    return endCell.figure === null;
  }

  isEnemy(startCell, cell) {
    return startCell.figure.color !== cell.figure.color
  }

  checkEmptyDiagonal(startCell, endCell, dx, dy) {
    if (dy !== dx) return false;

    const x = (endCell.x > startCell.x) ? 1 : -1;
    const y = (endCell.y > startCell.y) ? 1 : -1;
    const listEnemy = [];
    if(!this.isFreeCell(endCell)) return false;
    for (let i = 1; i < dx; i++) {
      const currentFiruge = this.cells[i * y + startCell.y][ i * x + startCell.x].figure
      if (currentFiruge) {
        listEnemy.push(currentFiruge.color);
        if(listEnemy.length > 1) return false;
      }
    }

    if(listEnemy[0] !== startCell.figure.color) {
      for (let i = 1; i < dx; i++) {
        this.cells[i * y + startCell.y][ i * x + startCell.x].figure = null
      }
      return true
    }
  }
}
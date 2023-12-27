import { COLORS } from "../resource/colors.js";
import { FIGURES } from "../resource/figures.js";
import { START_POSITION } from "../resource/position.js";
import { STRINGS } from "../resource/string.js";

export default class Figure {
  constructor(src, type, cells) {
    this.type = type;
    this.HTML = this.initialization(src);
    this.color = this.setColor(src);
    this.isFirstMove = true;
    this.cells = cells;
  }

  initialization(src) {
    const figureHTML = document.createElement('img');
    figureHTML.classList.add('figure');
    figureHTML.src = src;
    return figureHTML;
  }

  setColor(src){
    return (src.includes(COLORS.white)) ? COLORS.white : COLORS.black;
  }

  move(startCell, endCell){
    startCell.figure.isFirstMove = false;
    endCell.figure = startCell.figure;
    startCell.figure = null;
    endCell.figure.transformation(endCell);
    return true;
  }

  isEnemyFigure(startCell, endCell){
    if(endCell.figure === null) return true;
    return startCell.figure.color !== endCell.figure.color;
  }

  checkEmptyVertical(startCell, endCell) {
    const minY = Math.min(startCell.y, endCell.y);
    const maxY = Math.max(startCell.y, endCell.y);

    for (let y = minY + 1; y < maxY; y++) {
      if (this.cells[y][startCell.x].figure) {
        return false;
      }
    }
    if(this.isEnemyFigure(startCell, endCell)) return true;
    return false;
  }

  checkEmptyHorizontal(startCell, endCell) {
    const minX = Math.min(startCell.x, endCell.x);
    const maxX = Math.max(startCell.x, endCell.x);

    for (let x = minX + 1; x < maxX; x++) {
      if (this.cells[startCell.y][x].figure) {
        return false;
      }
    }
    if(this.isEnemyFigure(startCell, endCell)) return true;
    return false;
  }

  checkEmptyDiagonal(startCell, endCell, dx, dy) {
    if (dy !== dx) return false;

    const x = (endCell.x > startCell.x) ? 1 : -1;
    const y = (endCell.y > startCell.y) ? 1 : -1;

    for (let i = 1; i < dx; i++) {
      if (this.cells[i * y + startCell.y][ i * x + startCell.x].figure) {
        return false;
      }
    }
    if(this.isEnemyFigure(startCell, endCell)) return true;
    return false;
  }

  transformation(cell){
    if(cell.figure.type === STRINGS.pawn) {
      cell.figure.transformationForPawn(cell);
    }
    if(cell.figure.type === STRINGS.checker){
      cell.figure.transformationForChecker(cell);
    }
  }

  transformationForPawn(cell){
    if (cell.y === START_POSITION.size - 1) {
      cell.board.showTransModal().then((buttonId) => {
        cell.figure.transPawn(cell, buttonId);
      });
    } 

    if (cell.y === 0) {
      cell.board.showTransModal().then((buttonId) => {
        cell.figure.transPawn( cell, buttonId.toLowerCase);
      });
    }
  }

  transPawn(cell, idFigure){
    cell.figure = FIGURES[idFigure].createFigure(this.cells);
    cell.board.initialization();
  }

  transformationForChecker(cell){
    if(cell.y === START_POSITION.size - 1) {
      cell.figure = FIGURES[STRINGS.Damka].createFigure(this.cells);
      return;
    } 
    if(cell.y === 0) {
      cell.figure = FIGURES[STRINGS.damka].createFigure(this.cells);
      return;
    }
  }

  canBeatInAnyDirection(cell) {}
}

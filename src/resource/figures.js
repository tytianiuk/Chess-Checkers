import { Bishop } from "../figures/bishop.js";
import { Checker } from "../figures/checker.js";
import { Damka } from "../figures/damka.js";
import { King } from "../figures/king.js";
import { Knight } from "../figures/knight.js";
import { Pawn } from "../figures/pawn.js";
import { Queen } from "../figures/queen.js";
import { Rook } from "../figures/rook.js";

//collection all figures

export const FIGURES = {
  K: {
    src: './resource/figures/white_king.png',
    type: 'king',
    createFigure: function(cells) {
      return new King(this.src, this.type,cells);
    }
  },
  Q: {
    src: './resource/figures/white_queen.png',
    type: 'queen',
    createFigure: function(cells) {
      return new Queen(this.src, this.type, cells);
    }
  },
  R: {
    src: './resource/figures/white_rook.png',
    type: 'rook',
    createFigure: function(cells) {
      return new Rook(this.src, this.type, cells);
    }
  },
  B: {
    src: './resource/figures/white_bishop.png',
    type: 'bishop',
    createFigure: function(cells) {
      return new Bishop(this.src, this.type, cells);
    }
  },
  N: {
    src: './resource/figures/white_knight.png',
    type: 'knight',
    createFigure: function(cells) {
      return new Knight(this.src, this.type, cells);
    }
  },
  P: {
    src: './resource/figures/white_pawn.png',
    type: 'pawn',
    createFigure: function(cells) {
      return new Pawn(this.src, this.type, cells);
    }
  },
  k: {
    src: './resource/figures/black_king.png',
    type: 'king',
    createFigure: function(cells) {
      return new King(this.src, this.type, cells);
    }
  },
  q: {
    src: './resource/figures/black_queen.png',
    type: 'queen',
    createFigure: function(cells) {
      return new Queen(this.src, this.type, cells);
    }
  },
  r: {
    src: './resource/figures/black_rook.png',
    type: 'rook',
    createFigure: function(cells) {
      return new Rook(this.src, this.type, cells);
    }
  },
  b: {
    src: './resource/figures/black_bishop.png',
    type: 'bishop',
    createFigure: function(cells) {
      return new Bishop(this.src, this.type, cells);
    }
  },
  n: {
    src: './resource/figures/black_knight.png',
    type: 'knight',
    createFigure: function(cells) {
      return new Knight(this.src, this.type, cells);
    }
  },
  p: {
    src: './resource/figures/black_pawn.png',
    type: 'pawn',
    createFigure: function(cells) {
      return new Pawn(this.src, this.type, cells);
    }
  },
  C: {
    src: './resource/figures/white_checker.png',
    type: 'checker',
    createFigure: function(cells) {
      return new Checker(this.src, this.type, cells);
    }
  },
  c: {
    src: './resource/figures/black_checker.png',
    type: 'checker',
    createFigure: function(cells) {
      return new Checker(this.src, this.type, cells);
    }
  },
  D: {
    src: './resource/figures/white_checker_queen.png',
    type: 'damka',
    createFigure: function(cells) {
      return new Damka(this.src, this.type, cells);
    }
  },
  d: {
    src: './resource/figures/black_checker_queen.png',
    type: 'damka',
    createFigure: function(cells) {
      return new Damka(this.src, this.type, cells);
    }
  },
  0: null,
}
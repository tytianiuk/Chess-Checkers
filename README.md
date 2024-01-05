# Chess-Checkers
> **NOTE:** launcher is designed to be played on a single device

The chess and checkers apps were chosen to create a universal 
tool for players interested in the two strategic board games - chess and checkers. By combining these two games in one application, we create a convenient environment for players who like to develop their logical and strategic thinking.

To implement the project, we decided to use the JavaScript programming language with convenient graphical tools, such as: HTML and CSS. I used the OOP paradigm to improve my skills and the ability to update  

### Why is this interesting?
<hr>

* combining two games in one project
* promotes the popularisation of logic and strategy games
* easy to use

### How to run it on your device?
<hr>
 
1. write in your terminal ```git clone <https or ssh addres>```
2. run HTML in a browser or using a server

You see the icons of chess and checkers, you can start the game!

### How to use game?
<hr>

In the project, the main module Main.js is responsible for listening to all the keystrokes 
of the user and creating a game board with pieces when the user selects 
the appropriate game.

**To create board use:** 
```javascript
board = new Board(boardContainer, START_POSITION.size, turnMoveImage)
```

**To add figure use:**
```javascript
board.addFigures()
```

**Start position**

**Figures.js** collection is used to create instances of shape classes that have an abstract **Figure** class.

**Start position**

The starting position for chess and checkers is used - it is quite convenient and compact.


```javascript
export const START_POSITION = {
  positionChess:
    'RNBQKBNR/PPPPPPPP/000000000/00000000/00000000/00000000/pppppppp/rnbqkbnr',
  positionCheckers:
    'C0C0C0C0/0C0C0C0C/C0C0C0C0/00000000/00000000/0c0c0c0c/c0c0c0c0/0c0c0c0c',
  size: 8,
  time: 300,
 // ...
}
```
### Timers for players

A **Game** class and a **Player** class were created to create timers. When creating an instance of the **Game** class, 2 timers are created, which are instances of the **Player** class.

```javascript 
export class Game {
  constructor(name, board) {
    this.players = {
      white: new Player(COLORS.white, board),
      black: new Player(COLORS.black, board),
    }
    this.currentPlayer = COLORS.white
    this.name = name
    this.isPausedFlag = false
  }
  // ...
}
```

There is a pause option so that players don't have to worry about time if they need to be distracted immediately.

### Enjoy the game with your friends!

### License
<hr>

[MIT License](LICENSE)
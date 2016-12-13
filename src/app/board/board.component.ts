import { Component, Input, OnInit} from '@angular/core';
import { Square } from './square';
import { Logger } from '../logging/logger.service';
import { Settings } from '../game/settings';
import { GameService } from '../game/game.service'
import { Move, MoveBuilder } from '../game/move'

@Component({
  selector: 'ttt-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  id:string;
  nextPlayer:number = 0;
  symbols = ['X', 'O'];
  winner:boolean = false;
  occupiedSquares:number = 0;
  boardFull:boolean = false;
  _settings:Settings = new Settings();
  
  constructor(private logger:Logger, private gameService:GameService) {}
  
  collections:Array<Array<Square>> = [
    [{id:0, val:null, row: 0, col: 0}, {id:1, val:null, row: 0, col: 1}, {id:2, val:null, row: 0, col: 2}],
    [{id:3, val:null, row: 1, col: 0}, {id:4, val:null, row: 1, col: 1}, {id:5, val:null, row: 1, col: 2}],
    [{id:6, val:null, row: 2, col: 0}, {id:7, val:null, row: 2, col: 1}, {id:8, val:null, row: 2, col: 2}]
  ];
  selected:Square = null;
  
  handleClicked(clickedVal):void {
     if ((clickedVal.val != null) || this.winner) { 
        return;
     }
     let activePlayer:number = this.nextPlayer;
     clickedVal.val = this.symbols[this.nextPlayer];
     this.nextPlayer = ++this.nextPlayer % this._settings.players;
     this.selected = clickedVal;
     
     if (this._settings.winConditionEnabled) {
       this.updateWinner();
     }
     
     if (++this.occupiedSquares == 9 && !this.winner) {
       this.boardFull = true;
     }
     let move:Move = new MoveBuilder().player(activePlayer).row(clickedVal.row).col(clickedVal.col).toMove();
     this.gameService.commitMove(this.id, move);
  }
  
  reset():Promise<any> {
    for (let row of this.collections) {
      for (let square of row) { 
        square.val = null;
      }
    }
    
    this.selected = null;
    this.winner = false;
    this.boardFull = false;
    this.occupiedSquares = 0;
    this.nextPlayer = 0;
    this.logger.info("Game Reset");
    return this.gameService.createGameInstance().then(
      (num) => {
        this.id = num;
      }).catch((ex) => this.logger.error(ex));
  }
  
  updateWinner():void {
    if(this.hasHorizontalWin() ||
       this.hasVerticalWin() ||
       this.hasDiagonalWin()) {
       this.winner = true;
       this.logger.info("There is a winner");
    }
  }
  
  hasHorizontalWin():boolean {
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      let squareArray:Array<Square> = []
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        squareArray.push(this.getSquare(rowIdx, colIdx));
      }
      
      if (this.hasSame(squareArray)) {
        return true;
      }
    }
  }
  
  hasVerticalWin():boolean {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      let squareArray:Array<Square> = []
      for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        squareArray.push(this.getSquare(rowIdx, colIdx));
      }
      
      if (this.hasSame(squareArray)) {
        return true;
      }
    }
  }
  
  hasDiagonalWin():boolean {
    const maxCol = 2;
    let lineCollection:Array<Array<Square>> = [[], []]
    for (let idx = 0; idx < 3; idx++) {
      lineCollection[0].push(this.getSquare(idx, idx));
      lineCollection[1].push(this.getSquare(idx, maxCol - idx));
    }
    
    for (let squareArray of lineCollection) {
      if (this.hasSame(squareArray)) {
        return true;
      }
    }
    
  }
  
  hasSame(squareArray:Array<Square>):boolean {
     if (squareArray == null || squareArray.length == 0) {
       return false;
     }
     
     let squareSlice = squareArray.slice();
     
     let val = squareSlice.shift().val;
     if (val == null) {
       return false;
     }
     
     for (let currentSquare of squareSlice) {
       if (currentSquare.val != val) {
         return false;
       }
     }
     
     return true;
  }
  
  getSquare(rowIdx:number, colIdx:number):Square {
    return this.collections[rowIdx][colIdx];
  }

  @Input() 
  set settings(settings: Settings) {
     this.logger.info("Settings updated?")
     this._settings = settings;
     this.reset();
  }
  
  get settings() {
     return this._settings;
  }
}

import { Component } from '@angular/core';
import { Square } from './Square'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  players = 2;
  nextPlayer = 0;
  symbols = ['X', 'O'];
  title:string = "Tic-tac-toe"
  winner:boolean = false;
  winConditionEnabled = true;
  
  collections: Array<Array<Square>> = [
    [{id:0, val:null}, {id:1, val:null}, {id:2, val:null}],
    [{id:3, val:null}, {id:4, val:null}, {id:5, val:null}],
    [{id:6, val:null}, {id:7, val:null}, {id:8, val:null}]
  ];
  selected:Square= null;
  
  handleClicked(clickedVal) {
     if ((clickedVal.val != null) || this.winner) { 
        return;
     }
     clickedVal.val = this.symbols[this.nextPlayer];
     this.nextPlayer = ++this.nextPlayer % this.players;
     this.selected = clickedVal;
     if (this.winConditionEnabled) {
       this.updateWinner();
     }
  }
  
  reset() {
    for (let row of this.collections) {
      for (let square of row) { 
        square.val = null;
      }
    }
    
    this.selected = null;
    this.winner = false;
  }
  
  updateWinner() {
    if(this.hasHorizontalWin() ||
       this.hasVerticalWin() ||
       this.hasDiagonalWin()) {
      this.winner = true;
    }
  }
  
  hasHorizontalWin():Boolean {
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
  
  hasVerticalWin():Boolean {
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
  
  hasDiagonalWin():Boolean {
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
  
  hasSame(squareArray:Array<Square>):Boolean {
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
  
  getSquare(rowIdx:number, colIdx:number) {
    return this.collections[rowIdx][colIdx];
  }
  
}

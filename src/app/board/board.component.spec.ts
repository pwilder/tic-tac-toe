/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { Logger } from '../logging/logger.service';
import { ConsoleLogger } from '../logging/console-logger.service';
import { By }           from '@angular/platform-browser';
import { Settings } from '../game/settings';
import { GameService } from '../game/game.service';

describe('Board: BoardTest', () => {
  
  let boardComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent
      ],
       providers: [{provide: Logger, useClass: QuietLogger}, 
         GameService]
    });
    fixture = TestBed.createComponent(BoardComponent);
    boardComponent = fixture.debugElement.componentInstance;
    boardComponent.settings = new Settings();
  }));
  
  
  it('should have every table cell respond to clicks', async(() => {
    boardComponent._settings.winConditionEnabled = false;
    let cellArray:Array<HTMLElement> = createFlatCellArray(fixture);
    let selectCount:number = 0;
    
    for (let cell of cellArray) {  
        cell.click();
        let expectedVal;
        if (selectCount++ % 2 == 0) {
          expectedVal = 'X';
        } else {
          expectedVal = 'O';
        }
        expect(boardComponent.selected.val).toEqual(expectedVal); 
    }
  }));
  
  
  it("clears all fields when reset is clicked", async(() => {
     for (let row of boardComponent.collections) {
       for (let square of row) {
         boardComponent.handleClicked(square);
       }
     }
     
     boardComponent.reset();
     
     for (let row of boardComponent.collections) {
       for (let square of row) {
         expect(square.val).toEqual(null)
       }
     }
     
     expect(boardComponent.selected).toEqual(null);
  }))
  
  it("sets the winner when a horizontal line is made", async(() => {
     boardComponent._settings.players = 1
     for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
       for (let colIdx = 0; colIdx < 3; colIdx++) {
         boardComponent.handleClicked(boardComponent.getSquare(rowIdx, colIdx));
       }
       expect(boardComponent.winner).toEqual(true);
       boardComponent.reset();
     }
  }))
  
  it("sets the winner when a vertical line is made", async(() => {
     boardComponent._settings.players = 1
     for (let colIdx = 0; colIdx < 3; colIdx++) {
       for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
         boardComponent.handleClicked(boardComponent.getSquare(rowIdx, colIdx));
       }
       expect(boardComponent.winner).toEqual(true);
       boardComponent.reset();
     }
  }))
  
  it("sets the winner when a diagonal line is made", async(() => {
     boardComponent._settings.players = 1
     for (let idx = 0; idx < 3; idx++) {
       boardComponent.handleClicked(boardComponent.getSquare(idx, idx));
     }
     expect(boardComponent.winner).toEqual(true);
     boardComponent.reset();
     
     for (let idx = 0; idx < 3; idx++) {
       boardComponent.handleClicked(boardComponent.getSquare(idx, 2 - idx));
     }
     expect(boardComponent.winner).toEqual(true);
     boardComponent.reset();
  }))
  
  it("boardFull  is set when all squares are full", async(() => {
     boardComponent._settings.players = 1
     boardComponent._settings.winConditionEnabled = false;
     expect(boardComponent.boardFull).toEqual(false);
     for (let row of boardComponent.collections) {
       for (let square of row) {
         boardComponent.handleClicked(square);
       }
     }
     
     expect(boardComponent.boardFull).toEqual(true);
     boardComponent.reset();
     expect(boardComponent.boardFull).toEqual(false);
  }))
  
  it("nextPlayer is reset when reset is triggered", async(() => {
     
     expect(boardComponent.nextPlayer).toEqual(0);
     boardComponent.handleClicked(boardComponent.collections[0][0]);
     expect(boardComponent.nextPlayer).toEqual(1);
     boardComponent.reset();
     expect(boardComponent.nextPlayer).toEqual(0);
  }))
  
  it(`on reset the id should change`, async(() => {
    let promise = boardComponent.reset();
    
    promise.then(() => {
      expect(boardComponent.id).not.toBeNull(); 
    });
  }));
  
  it('should increase the move list of the game with every click', async(() => {
    boardComponent._settings.winConditionEnabled = false;
    let cellArray:Array<HTMLElement> = createFlatCellArray(fixture);
    let selectCount:number = 0;
    let gs:GameService = fixture.debugElement.injector.get(GameService);
    let spy = spyOn(gs, 'commitMove');
    let gameId:string = boardComponent.id;
    
    for (let cell of cellArray) {
      cell.click();
    }
    
    expect(spy.calls.count()).toEqual(9);
  }));
  
  function createFlatCellArray(fixture) : Array<HTMLElement> {
    let app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let table = compiled.querySelector('table')
    let rowArray = table.querySelectorAll('tr');
    
    let returnArray:Array<HTMLElement> = []
    
    for (let rIdx = 0; rIdx < rowArray.length; rIdx++) {
        let currentRow = rowArray[rIdx];
        let colArray = currentRow.querySelectorAll('td')
        for (let cIdx = 0; cIdx < colArray.length; cIdx++) {
            returnArray.push(colArray[cIdx]);
        }
    }
    
    return returnArray; 
  }
  
  class QuietLogger extends Logger {
    
    log(level:string, message:string) {
      
    }
  }
});

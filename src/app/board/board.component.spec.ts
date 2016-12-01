/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { Logger } from '../logging/logger.service';
import { By }           from '@angular/platform-browser';
import { Settings } from '../settings/settings';

describe('Board: BoardTest', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BoardComponent
      ],
      providers: [Logger]
    });
    
  });
  
  /**
  it('should have every table cell respond to clicks', async(() => {
    let fixture = TestBed.createComponent(BoardComponent);
    let boardComponent = fixture.debugElement.componentInstance;
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
        expect(app.selected.val).toEqual('expectedVal'); 
    }
  }));
  */
  
  it("clears all fields when reset is clicked", async(() => {
     let boardComponent = new BoardComponent(new MockLogger());
     
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
     let boardComponent = new BoardComponent(new MockLogger());
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
     let boardComponent = new BoardComponent(new MockLogger());
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
     let boardComponent = new BoardComponent(new MockLogger());
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
     let boardComponent = new BoardComponent(new MockLogger());
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
     let boardComponent = new BoardComponent(new MockLogger());
     
     expect(boardComponent.nextPlayer).toEqual(0);
     boardComponent.handleClicked(boardComponent.collections[0][0]);
     expect(boardComponent.nextPlayer).toEqual(1);
     boardComponent.reset();
     expect(boardComponent.nextPlayer).toEqual(0);
  }))
  
  /**
   * FWIW, I appreciate that this is an exceptionally fragile test. It effectively prevents me from 
   * adding new info logs (typically something we want to encourage) without potentially breaking this test.
   *
   * At the time of writing this test more about the succesful use of mocks than it was about adding test value.
   */
  it("logs an info message when there is a winner", async(() => {
     let mockLogger:MockLogger = new MockLogger();
     let boardComponent = new BoardComponent(mockLogger);
     boardComponent._settings.players = 1;
     
     
     for (let square of boardComponent.collections[0]) {
       boardComponent.handleClicked(square);
     }
     
     
     expect(mockLogger.logTracker.info.length).toEqual(1);
  }))
  
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
  
  class MockLogger extends Logger {
    logTracker = {
      fatal: [],
      error: [],
      warn: [],
      info: [],
      debug: [],
      trace: []
    }
    
    fatal(message:string) {
      this.logTracker.fatal.push(message);
    }

    error(message:string) {
      this.logTracker.error.push(message);
    }

    warn(message:string) {
      this.logTracker.warn.push(message);
    }

    info(message:string) {
      this.logTracker.info.push(message);
    }

    debug(message:string) {
      this.logTracker.debug.push(message);
    }

    trace(message:string) {
      this.logTracker.trace.push(message);
    }
  }
});

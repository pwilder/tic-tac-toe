/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Logger } from './logging/logger.service';
import { SettingsModule } from './settings/settings.module';
import { By }           from '@angular/platform-browser';
import { Settings } from './settings/settings';

describe('App: AngTest', () => {
  
  const expectedTitle = 'Tic-tac-toe';
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        SettingsModule
      ],
      providers: [Logger]
    });
    
  });

  it(`should have as title 'Tic-tac-toe'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent); 
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(expectedTitle);
  }));
  
  /**
  it('should have every table cell respond to clicks', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    app.winConditionEnabled = false;
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
        expect(app.selected.val).toEqual(expectedVal); 
    }
  }));
  */
  
  it("clears all fields when reset is clicked", async(() => {
     let appComponent = new AppComponent(new MockLogger());
     
     for (let row of appComponent.collections) {
       for (let square of row) {
         appComponent.handleClicked(square);
       }
     }
     
     appComponent.reset();
     
     for (let row of appComponent.collections) {
       for (let square of row) {
         expect(square.val).toEqual(null)
       }
     }
     
     expect(appComponent.selected).toEqual(null);
  }))
  
  it("sets the winner when a horizontal line is made", async(() => {
     let appComponent = new AppComponent(new MockLogger());
     appComponent.players = 1
     for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
       for (let colIdx = 0; colIdx < 3; colIdx++) {
         appComponent.handleClicked(appComponent.getSquare(rowIdx, colIdx));
       }
       expect(appComponent.winner).toEqual(true);
       appComponent.reset();
     }
  }))
  
  it("sets the winner when a vertical line is made", async(() => {
     let appComponent = new AppComponent(new MockLogger());
     appComponent.players = 1
     for (let colIdx = 0; colIdx < 3; colIdx++) {
       for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
         appComponent.handleClicked(appComponent.getSquare(rowIdx, colIdx));
       }
       expect(appComponent.winner).toEqual(true);
       appComponent.reset();
     }
  }))
  
  it("sets the winner when a diagonal line is made", async(() => {
     let appComponent = new AppComponent(new MockLogger());
     appComponent.players = 1
     for (let idx = 0; idx < 3; idx++) {
       appComponent.handleClicked(appComponent.getSquare(idx, idx));
       
     }
     expect(appComponent.winner).toEqual(true);
     appComponent.reset();
     
     for (let idx = 0; idx < 3; idx++) {
       appComponent.handleClicked(appComponent.getSquare(idx, 2 - idx));
       
     }
     expect(appComponent.winner).toEqual(true);
     appComponent.reset();
  }))
  
  it("boardFull  is set when all squares are full", async(() => {
     let appComponent = new AppComponent(new MockLogger());
     appComponent.players = 1
     appComponent.winConditionEnabled = false;
     expect(appComponent.boardFull).toEqual(false);
     for (let row of appComponent.collections) {
       for (let square of row) {
         appComponent.handleClicked(square);
       }
     }
     
     expect(appComponent.boardFull).toEqual(true);
     appComponent.reset();
     expect(appComponent.boardFull).toEqual(false);
  }))
  
  /**
   * FWIW, I appreciate that this is an exceptionally fragile test. It effectively prevents me from 
   * adding new info logs (typically something we want to encourage) without potentially breaking this test.
   *
   * At the time of writing this test more about the succesful use of mocks than it was about adding test value.
   */
  it("logs an info message when there is a winner", async(() => {
     let mockLogger:MockLogger = new MockLogger();
     let appComponent = new AppComponent(mockLogger);
     appComponent.players = 1;
     
     
     for (let square of appComponent.collections[0]) {
       appComponent.handleClicked(square);
     }
     
     
     expect(mockLogger.logTracker.info.length).toEqual(1);
  }))
  
  it("starts a new game when it receives new settings", async(() => {
     let mockLogger:MockLogger = new MockLogger();
     let appComponent = new AppComponent(mockLogger);
     appComponent.players = 1;
     
     
     for (let square of appComponent.collections[0]) {
       appComponent.handleClicked(square);
     }
     
     appComponent.onNewSettings(new Settings(1, false))
     expect(appComponent.players).toBe(1);
     expect(appComponent.winConditionEnabled).toBe(false);
     
     for (let square of appComponent.collections[0]) {
       expect(square.val).toEqual(null);
     }
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

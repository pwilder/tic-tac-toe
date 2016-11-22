/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: AngTest', () => {
  
  const expectedTitle = 'Tic-tac-toe';
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    });
    
  });

  it(`should have as title 'Tic-tac-toe'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent); 
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(expectedTitle);
  }));
  
  it('should have a 3x3 table', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    let table = compiled.querySelector('table')
    let childArray = table.querySelectorAll('tr');
    expect(childArray.length).toEqual(3)
    for (let i = 0; i < childArray.length; i++) {
        let currentRow = childArray[i];
        let colArray = currentRow.querySelectorAll('td')
        expect(colArray.length).toEqual(3);
    }
  }));
  
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
  
  it('subsequent clicks on the same cell are ignored.', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    app.winConditionEnabled = false;
    let cellArray:Array<HTMLElement> = createFlatCellArray(fixture);
    let selectCount:number = 0;
    
    let initState = "";
    for (let collection of app.collections) {
      for (let square of collection) {
        initState += square.val + " ";
      }
    }
    console.log(initState);
    
    for (let cell of cellArray) {
        cell.click();
        let expectedVal;
        if (selectCount++ % 2 == 0) {
          expectedVal = 'X';
        } else {
          expectedVal = 'O';
        }
        let oldVal = app.selected.val;
        expect(oldVal).toEqual(expectedVal); 
        cell.click();
        let newVal = app.selected.val;
        expect(app.selected.val).toEqual(expectedVal); 
        console.log(oldVal + " " + newVal);
    }
  }));
  
  it("clears all fields when reset is clicked", async(() => {
     let appComponent = new AppComponent();
     
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
     let appComponent = new AppComponent();
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
     let appComponent = new AppComponent();
     appComponent.players = 1
     for (let colIdx = 0; colIdx < 3; colIdx++) {
       for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
         appComponent.handleClicked(appComponent.getSquare(rowIdx, colIdx));
       }
       expect(appComponent.winner).toEqual(true);
       appComponent.reset();
     }
  }))
  
  it("sets the winner when a backwards slash line is made", async(() => {
     let appComponent = new AppComponent();
     appComponent.players = 1
     for (let idx = 0; idx < 3; idx++) {
       appComponent.handleClicked(appComponent.getSquare(idx, idx));
       
     }
     expect(appComponent.winner).toEqual(true);
     appComponent.reset();
  }))
  
  it("sets the winner when a foward slash line is made", async(() => {
     let appComponent = new AppComponent();
     appComponent.players = 1
     for (let idx = 0; idx < 3; idx++) {
       appComponent.handleClicked(appComponent.getSquare(idx, 2 - idx));
       
     }
     expect(appComponent.winner).toEqual(true);
     appComponent.reset();
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
});

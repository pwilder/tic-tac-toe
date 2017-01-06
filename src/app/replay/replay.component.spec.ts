/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { ReplayComponent } from './replay.component';
import { Logger } from '../logging/logger.service';
import { By }           from '@angular/platform-browser';
import { GameService } from '../game/game.service';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

describe('Replay: ReplayTest', () => {

  let replayComponent;
  let fixture;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [
        ReplayComponent
      ],
       providers: [{provide: Logger, useClass: QuietLogger},
         GameService]
    });
    fixture = TestBed.createComponent(ReplayComponent);
    replayComponent = fixture.debugElement.componentInstance;
  }))

  it('has a table with 9 cells', async(() => {
    let cellArray:Array<HTMLElement> = createFlatCellArray(fixture);
    expect(cellArray.length).toEqual(9);
  }))

  it('refresh button is clicked it loads game history', async(() => {
    expect(replayComponent.oldGames.length).toEqual(0);
    let gs:GameService = fixture.debugElement.injector.get(GameService);
    gs.createGameInstance().then((id) => {
      gs.createGameInstance().then((id2) => {
        replayComponent.loadReplays().then(() => {
          expect(replayComponent.oldGames.length).toEqual(2);
        })
      })
    })
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

  class QuietLogger extends Logger {

    log(level:string, message:string) {

    }
  }
})

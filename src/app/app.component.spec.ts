/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Logger } from './logging/logger.service';
import { SettingsModule } from './settings/settings.module';
import { BoardModule } from './board/board.module';
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
        SettingsModule, BoardModule
      ],
      providers: [Logger]
    });
    
  });

  it(`should have as title 'Tic-tac-toe'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent); 
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(expectedTitle);
  }));
  
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

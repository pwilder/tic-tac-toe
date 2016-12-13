/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { Logger } from '../logging/logger.service';
import { SettingsModule } from '../settings/settings.module';
import { BoardModule } from '../board/board.module';
import { By }           from '@angular/platform-browser';
import { Settings } from './settings';

describe('Game: GameTest', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        GameComponent
      ],
      imports: [
        SettingsModule, BoardModule
      ],
      providers: [Logger]
    });
    
  });
  
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

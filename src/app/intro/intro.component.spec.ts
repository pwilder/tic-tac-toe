/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { IntroComponent } from './intro.component';
import { Logger } from '../logging/logger.service';
import { By }           from '@angular/platform-browser';

describe('Game: GameTest', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IntroComponent
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

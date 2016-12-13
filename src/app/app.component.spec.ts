/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Logger } from './logging/logger.service';
import { IntroModule } from './intro/intro.module';
import { GameModule } from './game/game.module';
import { By }           from '@angular/platform-browser';
import {APP_BASE_HREF} from '@angular/common';

describe('App: AngTest', () => {
  
  const expectedTitle = 'Tic-tac-toe';
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        IntroModule, GameModule, AppRoutingModule
      ],
      providers: [Logger, 
      {provide: APP_BASE_HREF, useValue : '/' }]
    });
    
  });

  it(`should have as title 'Tic-tac-toe'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent); 
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual(expectedTitle);
  }));
  
  it(`should have a navigation bar`, async(() => {
    let fixture = TestBed.createComponent(AppComponent); 
    let nav = fixture.debugElement.nativeElement.querySelector('nav');
    expect(nav).not.toBeNull();
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


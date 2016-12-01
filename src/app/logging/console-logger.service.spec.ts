import { TestBed, async } from '@angular/core/testing';
import { ConsoleLogger } from './console-logger.service';
import { Logger } from './logger.service';

describe('ConsoleLogger', () => {
  
  it(`should log to console'`, async(() => {
    let logger = new ConsoleLogger();
    const loggerSpy = spyOn(logger, "log");


    let levels:Array<string> = ["fatal", "error", "warn", "info", "debug", "trace"];

    for (let level of levels) {
      logger[level]("Test input");
    }
    
    expect(loggerSpy.calls.count()).toEqual(levels.length);
    
  }));
});
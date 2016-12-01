import { Injectable } from '@angular/core';

import { Logger } from './logger.service';

/**
 * Log to the console with additional information like timestamp and severity
 */
@Injectable()
export class ConsoleLogger extends Logger{
  
  log(level:string, message:string) {
     console.log(level + ": " + message);
  }
}

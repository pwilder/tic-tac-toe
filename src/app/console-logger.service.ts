import { Injectable } from '@angular/core';
/**
 * Log to the console with additional information like timestamp and severity
 */
@Injectable()
export class ConsoleLogger {
  
  fatal(message:string) {
    this.writeLog("[FATAL]", message);
  }
  
  error(message:string) {
    this.writeLog("[FATAL]", message);
  }
  
  warn(message:string) {
    this.writeLog("[FATAL]", message);
  }
  
  info(message:string) {
    this.writeLog("[FATAL]", message);
  }
  
  debug(message:string) {
    this.writeLog("[FATAL]", message);
  }
  
  trace(message:string) {
    this.writeLog("[FATAL]", message);
  }
  
  writeLog(level:string, message:string) {
    console.log(level + ": " + message);
  }
}

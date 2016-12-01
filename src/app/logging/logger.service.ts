import { Injectable } from '@angular/core';
/**
 * Since Javascript doesn't provide interface support our root level logger is a no-op logger. The expectation is that children 
 * extend from logger and provide implementations
 */
@Injectable()
export class Logger {
  
  public static readonly FATAL:string = "[FATAL]";
  public static readonly ERROR:string = "[ERROR]";
  public static readonly WARN:string = "[WARN]";
  public static readonly INFO:string = "[INFO]";
  public static readonly DEBUG:string = "[DEBUG]";
  public static readonly TRACE:string = "[TRACE]";
  
  fatal(message:string) {
    this.log(Logger.FATAL, message);
  }
  
  error(message:string) {
    this.log(Logger.ERROR, message);
  }
  
  warn(message:string) {
    this.log(Logger.WARN, message);
  }
  
  info(message:string) {
    this.log(Logger.INFO, message);
  }
  
  debug(message:string) {
    this.log(Logger.DEBUG, message);
  }
  
  trace(message:string) {
    this.log(Logger.TRACE, message);
  }
  
  log(level:string, message:string) {
    throw new Error("Unsupported operation. Please extend this class and provide an implementation")
  }
}

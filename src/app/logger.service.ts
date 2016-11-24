import { Injectable } from '@angular/core';
/**
 * Since Javascript doesn't provide interface support our root level logger is a no-op logger. The expectation is that children 
 * extend from logger and provide implementations
 */
@Injectable()
export class Logger {
  
  fatal(message:string) {
    throw new Error("Unsupported operation. Please extend this class and provide an implementation")
  }
  
  error(message:string) {
    throw new Error("Unsupported operation. Please extend this class and provide an implementation")
  }
  
  warn(message:string) {
    throw new Error("Unsupported operation. Please extend this class and provide an implementation")
  }
  
  info(message:string) {
    throw new Error("Unsupported operation. Please extend this class and provide an implementation")
  }
  
  debug(message:string) {
    throw new Error("Unsupported operation. Please extend this class and provide an implementation")
  }
  
  trace(message:string) {
    throw new Error("Unsupported operation. Please extend this class and provide an implementation")
  }
}

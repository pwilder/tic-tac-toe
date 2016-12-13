import { Component } from '@angular/core';
import { Logger } from './logging/logger.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = "Tic-tac-toe"
  constructor(private logger:Logger) {
    
  }
  
}

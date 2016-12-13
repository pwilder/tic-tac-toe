import { Component } from '@angular/core';
import { Logger } from '../logging/logger.service';

@Component({
  selector: 'intro-root',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css']
})
export class IntroComponent {
  constructor(private logger:Logger) {
    
  }
  
}

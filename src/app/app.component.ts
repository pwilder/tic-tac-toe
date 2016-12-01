import { Component } from '@angular/core';
import { Square } from './square';
import { Logger } from './logging/logger.service';
import { Settings } from './settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = "Tic-tac-toe"
  settings:Settings = new Settings()
  constructor(private logger:Logger) {
    
  }

  
  onNewSettings(newSettings:Settings) {
    this.settings = newSettings;
    this.logger.info("Updating settings");
  }
  
}

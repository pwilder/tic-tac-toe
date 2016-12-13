import { Component } from '@angular/core';
import { Logger } from '../logging/logger.service';
import { Settings } from './settings';

@Component({
  selector: 'game-root',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  settings:Settings = new Settings()
  constructor(private logger:Logger) {
    
  }

  
  onNewSettings(newSettings:Settings) {
    this.settings = newSettings;
    this.logger.info("Updating settings");
  }
  
}

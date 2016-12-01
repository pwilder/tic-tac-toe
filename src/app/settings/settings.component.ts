import {Component} from '@angular/core';
import {EventEmitter, Output } from '@angular/core';
import { Logger } from '../logging/logger.service';
import { Settings } from '../settings'

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  @Output() onNew = new EventEmitter<Settings>();
  playerNum:number = 2;
  winConditionEnabled:string = 'true';
  
  constructor(private logger:Logger) {}
  
  handleClick(clickedValue) {
      let boolWinCondition = this.winConditionEnabled == "true";
      this.onNew.emit(new Settings(this.playerNum, boolWinCondition));
      console.log("Handle New Game click");
  }
}

import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { ReplayComponent }     from './replay.component';
import { GameService }         from '../game/game.service';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ ReplayComponent ],
  exports:      [ ReplayComponent ],
  providers:    [ GameService ]
})
export class ReplayModule { }
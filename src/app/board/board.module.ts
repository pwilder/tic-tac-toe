import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { BoardComponent }      from './board.component';
import { GameService }         from '../game/game.service';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ BoardComponent ],
  exports:      [ BoardComponent ],
  providers:    [ GameService ]
})
export class BoardModule { }
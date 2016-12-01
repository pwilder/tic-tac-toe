import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { BoardComponent }      from './board.component';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ BoardComponent ],
  exports:      [ BoardComponent ]
})
export class BoardModule { }
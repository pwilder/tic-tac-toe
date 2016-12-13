import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { IntroComponent }      from './intro.component';

@NgModule({
  imports:      [ CommonModule, FormsModule ],
  declarations: [ IntroComponent ],
  exports:      [ IntroComponent ]
})
export class IntroModule { }
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Logger } from '../logging/logger.service';
import { ConsoleLogger } from '../logging/console-logger.service';
import { SettingsModule } from '../settings/settings.module';
import { BoardModule } from '../board/board.module';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule, 
    SettingsModule,
    BoardModule
  ],
  providers: [{provide: Logger, useClass: ConsoleLogger}] 
})
export class GameModule { }
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Logger } from './logging/logger.service';
import { ConsoleLogger } from './logging/console-logger.service';
import { GameModule } from './game/game.module';
import { IntroModule } from './intro/intro.module';
import { ReplayModule } from './replay/replay.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    HttpModule, 
    GameModule,
    IntroModule, 
    ReplayModule
  ],
  providers: [{provide: Logger, useClass: ConsoleLogger}],
  bootstrap: [AppComponent]
})
export class AppModule { }

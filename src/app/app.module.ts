import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Logger } from './logging/logger.service';
import { ConsoleLogger } from './logging/console-logger.service';
import { SettingsModule } from './settings/settings.module';
import { BoardModule } from './board/board.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    SettingsModule,
    BoardModule
  ],
  providers: [{provide: Logger, useClass: ConsoleLogger}],
  bootstrap: [AppComponent]
})
export class AppModule { }

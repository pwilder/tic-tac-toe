import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Logger } from './logging/logger.service';
import { ConsoleLogger } from './logging/console-logger.service';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    SettingsModule
  ],
  providers: [{provide: Logger, useClass: ConsoleLogger}],
  bootstrap: [AppComponent]
})
export class AppModule { }

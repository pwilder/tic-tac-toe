/* tslint:disable:no-unused-variable */

import { Component } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { TestBed, async } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { Settings } from './settings'
import { Logger } from '../logging/logger.service';
import { By }           from '@angular/platform-browser';

describe('Settings comp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ],
      providers: [Logger]
    });  
  });
  
  it(`should have a form with multiple select components`, async(() => {
    let fixture = TestBed.createComponent(SettingsComponent);
    let compiled = fixture.debugElement.nativeElement;
    let selectArray = compiled.querySelectorAll("select");
    expect(selectArray.length).toEqual(2);
  }));
  
  it('should emit on click', async(() => {
     let fixture = TestBed.createComponent(SettingsComponent);
     let settingsComp = fixture.debugElement.componentInstance;
     let trigger = fixture.debugElement.query(By.css('.export'));
     let newSettings:Settings;
     let expectedSettings:Settings = new Settings();
     settingsComp.onNew.subscribe((settings:Settings) => newSettings = settings)
     
     trigger.triggerEventHandler('click', null);
     
     expect(newSettings).toEqual(expectedSettings);
  }))
})
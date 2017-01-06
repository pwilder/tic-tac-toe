import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent }       from './intro/intro.component';
import { GameComponent }        from './game/game.component';
import { ReplayComponent }      from './replay/replay.component';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'introduction',  component: IntroComponent },
  { path: 'game', component: GameComponent },
  { path: 'replay', component: ReplayComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

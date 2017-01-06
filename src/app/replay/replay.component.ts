import { Component, Input} from '@angular/core';
import { Logger } from '../logging/logger.service';
import { GameService } from '../game/game.service';
import { Game } from '../game/game';
import { Move, MoveAttributes } from '../game/move';
import { Square } from '../board/square';


@Component({
  selector: 'replay-comp',
  templateUrl: './replay.component.html',
  styleUrls: ['./replay.component.css']
})
export class ReplayComponent  {

  oldGames:Array<Game> = [];
  _selectedGame:Game = null;
  symbols:Array<string> = ['X', 'O'];

  collections:Array<Array<Square>> = [
    [{id:0, val:null, row: 0, col: 0}, {id:1, val:null, row: 0, col: 1}, {id:2, val:null, row: 0, col: 2}],
    [{id:3, val:null, row: 1, col: 0}, {id:4, val:null, row: 1, col: 1}, {id:5, val:null, row: 1, col: 2}],
    [{id:6, val:null, row: 2, col: 0}, {id:7, val:null, row: 2, col: 1}, {id:8, val:null, row: 2, col: 2}]
  ];

  constructor(private logger:Logger, private gameService:GameService) {}

  loadReplays() {
    return this.gameService.getAllHistory().then((response) => {
      this.oldGames = response;
      this.logger.info("Replays loaded");
    }).catch((err) => this.logger.error(err));
  }

  @Input()
  set selectedGame(input:Game) {
    this._selectedGame = input;
    this.clearBoard();
    if (input == null) {
      return;
    }
    for (let move of this._selectedGame.data.attributes.moveList) {
      let moveAttr:MoveAttributes = move.data.attributes;
      this.collections[moveAttr.row][moveAttr.col].val = this.symbols[moveAttr.player];
    }
  }

  get selectedGame():Game {
    return this._selectedGame;
  }

  clearBoard():void {
    for (let row of this.collections) {
      for (let square of row) {
        square.val = null;
      }
    }
  }
}

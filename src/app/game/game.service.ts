import { Injectable } from '@angular/core';
import { Move } from './move';
import { Game, GameBuilder } from './game'

interface IdToGameMap {
  [id:string]: Game;
}

@Injectable()
export class GameService {
  gameHistory:IdToGameMap = { };
  
  createGameInstance():Promise<string> {
    let localHistory = this.gameHistory;
    return new Promise(function(resolve, reject) {
       let game:Game = new GameBuilder().toGame();
       localHistory[game.data.id] = game;
       resolve(game.data.id)
    });
  }
  
  commitMove(id:string, move:Move):Promise<boolean> {
    let localValidate = this.validateMove;
    let localHistory = this.gameHistory;
    return new Promise(function(resolve, reject) {
       if (id == null) {
         reject(new Error("No id provided"));
         return;
       }
       let validateError = localValidate(move);
       if (validateError != null) {
         reject(validateError);
         return;
       }
       
       let game:Game = localHistory[id];
       if (game == null) {
         reject(new Error("No game found for id: " + id))
       }
       
       game.data.attributes.moveList.push(move);
       
       resolve(true)
    });
  }
  
  validateMove(move:Move):Error {
    if (move == null) {
      return new Error("Move must not be null");
    }
    
    if (move.data == null) {
      return new Error("Move must have a data object");
    }
    
    if (move.data.id == null) {
      return new Error("Move must have an id");
    }
    
    if (move.data.attributes == null) {
      return new Error("Move must have attributes");
    }
    
    return null;
  }
  
  getAllHistory():Promise<Array<Game>> {
    let localHistory = this.gameHistory;
    return new Promise(function(resolve, reject) {
      let returnArray:Array<Game> = [];
      for (let key in localHistory) {
        returnArray.push(localHistory[key])
      }
      resolve(returnArray);
    });
  }
  
  getHistory(gameId:string):Promise<Game> {
    let localHistory = this.gameHistory;
    return new Promise(function(resolve, reject) {
       let game:Game = localHistory[gameId];
       resolve(game)
    });
  }
}

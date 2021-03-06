import { generateUuid } from '../utils/general';
import { Move } from './move';

export class Game {
  data:GameData;
}

export class GameData {
  id:string;
  attributes:GameAttributes;
}

export class GameAttributes {
  timestamp:number; 
  moveList:Array<Move>;
}

export class GameBuilder {
  game:Game;
  constructor() {
    this.game = new Game();
    this.game.data = new GameData();
    this.game.data.id = generateUuid();
    this.game.data.attributes = new GameAttributes();
    this.game.data.attributes.moveList = new Array<Move>();
    this.game.data.attributes.timestamp = new Date().getTime();
  }
  
  toGame():Game {
    return this.game;
  }
}
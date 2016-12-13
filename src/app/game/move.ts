import { generateUuid }  from '../utils/general'

export class Move {
   data:MoveData;
}

export class MoveData {
   id:string;
   attributes:MoveAttributes;
}

export class MoveAttributes {
   timestamp:number;
   player:number;
   row:number; 
   col:number;
}

export class MoveBuilder {
  move:Move
  
  constructor() {
    this.move = new Move()
    this.move.data = new MoveData();
    this.move.data.attributes = new MoveAttributes();
    this.move.data.id = generateUuid();
    this.move.data.attributes.timestamp = Date.now();
  }
  
  id(id:string):MoveBuilder {
    this.move.data.id = id;
    return this;
  }
  
  timestamp(timestamp:number):MoveBuilder {
    this.move.data.attributes.timestamp = timestamp;
    return this;
  }
  
  player(player:number):MoveBuilder {
    this.move.data.attributes.player = player;
    return this;
  }
  
  row(row:number):MoveBuilder {
    this.move.data.attributes.row = row;
    return this;
  }
  
  col(col:number):MoveBuilder {
    this.move.data.attributes.col = col;
    return this;
  }
  
  toMove():Move {
    return this.move;
  }
}
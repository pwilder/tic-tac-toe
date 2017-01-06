import { TestBed, async } from '@angular/core/testing';
import { Logger } from '../logging/logger.service';
import { GameService } from './game.service';
import { Move, MoveBuilder, MoveData } from '../game/move';

describe('GameService', () => {
  
  it(`should not die horribly`, async(() => {
    let gs = new GameService();
  }));
  
  it(`should permit the creation of a new game instance`, async(() => {
    let gs = new GameService();
    let lastId:string;
    gs.createGameInstance().then((id) => {
      lastId = id;
      expect(id).not.toBeNull();
    });
    
    gs.createGameInstance().then((id) => {
      expect(id).not.toBeNull();
      expect(id).not.toEqual(lastId);
    });
    
  }));
  
  it(`when a move is committed a boolean promise is returned to indicate success`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      let move:Move = new MoveBuilder().player(0).row(2).col(2).toMove();
      gs.commitMove(id, move).then((bool) => expect(bool).toEqual(true));
    })
  }));
  
  it(`will fail when an invalid game id is used`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      let move:Move = new MoveBuilder().player(0).row(2).col(2).toMove();
      gs.commitMove('cats', move).then((bool) => expect(bool).toBeUndefined()).catch((err) => expect(err).not.toBeNull());
    })
  }));
  
  it(`will fail when a move without data is used`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      let move:Move = new Move();
      gs.commitMove(id, move).then((bool) => expect(bool).toBeUndefined()).catch((err) => expect(err).not.toBeNull());
    })
  }));
  
  it(`will fail when a move without an id is used`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      let move:Move = new Move();
      move.data = new MoveData();
      gs.commitMove(id, move).then((bool) => expect(bool).toBeUndefined()).catch((err) => expect(err).not.toBeNull());
    })
  }));
  
  it(`will fail when a move without attributes is used`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      let move:Move = new Move();
      move.data = new MoveData();
      move.data.id = 'cats';
      gs.commitMove(id, move).then((bool) => expect(bool).toBeUndefined()).catch((err) => expect(err).not.toBeNull());
    })
  }));
  
  it(`allows a caller to retrieve all the moves associated with a particular game`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      let move:Move = new MoveBuilder().player(0).row(2).col(2).toMove();
      gs.commitMove(id, move).then(() => {
        gs.getHistory(id).then((history) => {
          expect(history).not.toBeNull(); 
          expect(history.data.id).toEqual(id);
          expect(history.data.attributes.moveList).not.toBeNull();
          expect(history.data.attributes.moveList.length == 1).toBeTruthy();
          expect(history.data.attributes.moveList[0].data.id == move.data.id).toBeTruthy();
        });
      });
    })
  }));
  
  it(`fails with an error when the wrong id is used`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      let move:Move = new MoveBuilder().player(0).row(2).col(2).toMove();
      gs.commitMove(id, move).then(() => {
        gs.getHistory('cats').then((history) => {
          expect(history).toBeUndefined();
        }).catch((err) => expect(err).not.toBeNull());
      });
    })
  }));
  
  it(`fetches all games when getHistory is called`, async(() => {
    let gs = new GameService();
    gs.createGameInstance().then((id) => {
      gs.createGameInstance().then((id2) => {
        gs.getAllHistory().then((gameArray) => {
          expect(gameArray.length).toEqual(2);
        })
      })
    })
  }));
  
});
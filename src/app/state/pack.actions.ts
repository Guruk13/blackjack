import { createAction, props } from '@ngrx/store';
import { PlayerComponent } from 'app/player/player.component';
import { Card } from '../models/cards.model';
import { Player } from '../models/player.model'

export const addCard = createAction(
  '[Pack] add card',
  props<{ cardId: string }>()
);

export const drawCard = createAction(
  '[Pack] draw a Card',
  props<{ cardId: string }>() //random card 
);

export const createdPack = createAction(
  'Create pack with x deck, unshuffled success ',
  props<{ somepack: ReadonlyArray<Card> }>()
);

export interface DealCardPayload {
  playerIdToDeal: number,
  cardToDeal: Card
}

export const dealCard = createAction(
  'Dealing a random card to a player',
  props<{
    tempoplayer: Player,
    cardToDeal: Card,
    handIndex:number
    }>()
)

export const createPlayers = createAction(
  '[Players] Creating players... success',
  props<{ somePlayers: ReadonlyArray<Player> }>()
)

export const shiftDecision = createAction(
  '[Players] Shifting decision between players',
  props<{
    currentPlayer: Player,
    nextPlayer: Player | undefined,
    currentIndex: number,
    nextIndex: number | undefined
  }>()
);

export const splitPair = createAction(
  '[Player] Splitting a pair in half with the initial bet',
  props<{
    tempoplayer: Player ,
    pairedHandIndex: number
  }>()
)



export const changeChipCount = createAction(
    '[Chips] Some player is losing/winning money',
    props<{ playerId:number, chips: number }>()
  );




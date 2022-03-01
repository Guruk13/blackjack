import { createAction, props } from '@ngrx/store';
import { PlayerComponent } from 'app/player/player.component';
import { Card } from '../models/cards.model';
import { Player } from '../models/player.model'
import { PlayerHand } from '../models/playerHand.model'

export const addCard = createAction(
  '[Pack] add card',
  props<{ cardId: string }>()
);


export const createdPack = createAction(
  'Create pack with x deck, unshuffled success ',
  props<{ somepack: ReadonlyArray<Card> }>()
);

export const raiseInitialBet = createAction(
  '[Hands] Set initial bet for player hands',
  props<{ initialBet: number }>()
);

export const dealCard = createAction(
  'Dealing a random card to a player',
  props<{
    tempoplayer: Player,
    cardToDeal: Card,
    handIdentifier: string,
  }>()
)

export const createPlayers = createAction(
  '[Players] Creating players... success',
  props<{ somePlayers: ReadonlyArray<Player> }>()
);

export const emptyHand = createAction(
  '[Hand]Creating first hands',
  props<{ tempoplayer: Player }>()
);

export const createHands = createAction(
  '[Hands] Creating playersHands... success',
  props<{ someHands: ReadonlyArray<PlayerHand> }>()
);


export const setSplittable = createAction(
  '[Hand] Setting/ unsetting splittability',
  props<{ id: string, userId: number, statusSplittable: string}>()
);

export const setWinloss = createAction(
  '[Hand] Winning/losing ',
  props<{ id: string, userId: number, winlossString: string, chipGained: number}>()
);


export const setChipsGains = createAction(
  '[Hand] Chips preview of wins losses  ',
  props<{ id: string, userId: number, chipGains: number}>()
);


export const setDoubleable = createAction(
  '[Hand] Setting/ unsetting doubleabillity ',
  props<{ id: string, userId: number,  doubleable: boolean }>()
);


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
    hand: PlayerHand
  }>()
)



export const changeChipCount = createAction(
  '[Chips] Player is putting chips in play ',
  props<{ playerId: number, pchips: number, handId: string, newchipsraised }>()
);


export const isOut = createAction(
  '[Player] Is out of this round ... ',
  props<{ playerId: number, }>()
);


export const trash = createAction(
  '[PLayerHands] unsets the hands of that player ',
  props<{ playerId: number, }>()
);


export const resetSplits = createAction(
  '[Player] Resetting this Player splitCount for nextRound  ',
  props<{ playerId: number, }>()
);



export const commitChips = createAction(
  '[PlayerHand] Committing Chips  ',
  props<{ playerHand:  PlayerHand, }>()
);




//didnt use entities so gotta use this to speed things up 
export const acessor = createAction(
  '[Player] Player modified ',
  props<{ player: Player, }>()
);




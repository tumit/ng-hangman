import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WordService } from './word.service';

export interface PuzzleState {
  puzzle: string[];
  selectedKeys: string[];
  triesRemain: number;
  word: string;
  isOver: boolean;
  loading: boolean;
}

export const initialState: PuzzleState = {
  puzzle: [],
  selectedKeys: [],
  triesRemain: 6,
  word: '',
  isOver: true,
  loading: false
};

export const PUZZLE_LOADING = 'PUZZLE_LOADING';
export const PUZZLE_START = 'PUZZLE_START';
export const PUZZLE_GUESS = 'PUZZLE_GUESS';

function start(state: PuzzleState, word: string): PuzzleState {
  return {
    ...state,
    word,
    puzzle: Array.apply('', Array(word.length)).map(_ => ''),
    isOver: false,
    loading: false
  };
}

function isSelected(state: PuzzleState, letter: string) {
  return state.selectedKeys.indexOf(letter) >= 0;
}

function isWrong(state: PuzzleState, letter: string) {
  return state.word.indexOf(letter) < 0;
}

function isOver(state: PuzzleState, puzzle: string[]) {
  return state.word === puzzle.join('');
}

function guess(state: PuzzleState, letter: string): PuzzleState {

  if (isSelected(state, letter)) {
    return state;
  }

  const selectedKeys = [...state.selectedKeys, letter];

  if (isWrong(state, letter)) {
    const triesRemain = state.triesRemain - 1;
    return {
      ...state,
      selectedKeys,
      triesRemain,
      isOver: triesRemain <= 0
    };
  }

  let pos = state.word.indexOf(letter);
  const puzzle = [...state.puzzle];
  puzzle[pos] = letter;

  pos = state.word.indexOf(letter, pos + 1);
  while (pos >= 0) {
    puzzle[pos] = letter;
    pos = state.word.indexOf(letter, pos + 1);
  }

  return { ...state, puzzle, selectedKeys, isOver: isOver(state, puzzle) };
}

class PuzzleLoadingAction implements Action {
  readonly type = PUZZLE_LOADING;
}

class PuzzleStartAction implements Action {
  readonly type = PUZZLE_START;
  constructor(public word: string) { }
}

class PuzzleGuessAction implements Action {
  readonly type = PUZZLE_GUESS;
  constructor(public letter: string) { }
}

export function hangmanReducer(state = initialState, action: PuzzleLoadingAction | PuzzleStartAction | PuzzleGuessAction) {
  switch (action.type) {
    case PUZZLE_LOADING:
      return { ...initialState, loading: true };
    case PUZZLE_START:
      return start(state, action.word);
    case PUZZLE_GUESS:
      return guess(state, action.letter);
    default: return state;
  }
}

@Injectable()
export class HangmanEffect {
  @Effect()
  start$: Observable<Action> = this.actions$
    .pipe(
      ofType<PuzzleLoadingAction>(PUZZLE_LOADING),
      switchMap(action => this.wordService.get()),
      map(word => ({ type: PUZZLE_START, payload: word }))
    );
  constructor(private wordService: WordService, private actions$: Actions) {}
}

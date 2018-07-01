import { of } from 'rxjs';

import { HangmanService, initialState, PuzzleState } from './hangman.service';
import { WordService } from './word.service';

function createHangmanService(state: PuzzleState): HangmanService {
  const mockWordService = new WordService(undefined);
  mockWordService.get = () => of({ word: 'test' });
  return new HangmanService(mockWordService, state);
}

describe('HangmanService', () => {

  let service: HangmanService;

  beforeEach(() => {
    service = createHangmanService(initialState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initial puzzle state with new word', () => {
    // arrange
    service.start();
    // assert
    const state$ = service.puzzleChanges();
    state$.subscribe(state => {
      expect(state).toEqual({
        puzzle: ['', '', '', ''],
        selectedKeys: [],
        triesRemain: 6,
        isOver: false,
        word: 'test'
      });
    });
  });

  describe('guess', () => {
    it('should do nothing when letter is selected', () => {
      // arrange
      const prepareState = {
        ...initialState,
        word: 'test',
        puzzle: ['t', '', '', ''],
        selectedKeys: ['t'],
      } as PuzzleState;
      service = createHangmanService(prepareState);

      // act
      service.guess('t');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state).toEqual({
          puzzle: ['t', '', '', ''],
          selectedKeys: ['t'],
          triesRemain: 6,
          isOver: false,
          word: 'test'
        });
      });
    });

    it('should add letter to selectedKeys & decrease triedRemain when is wrong', () => {
      // arrange
      const prepareState = {
        ...initialState,
        word: 'test',
        puzzle: ['t', '', '', ''],
        selectedKeys: ['t'],
      } as PuzzleState;
      service = createHangmanService(prepareState);

      // act
      service.guess('a');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state).toEqual({
          puzzle: ['t', '', '', ''],
          selectedKeys: ['t', 'a'],
          triesRemain: 5,
          isOver: false,
          word: 'test'
        });
      });
    });

    it('should set game over when triesRemain is zero', () => {
      // arrange
      const prepareState = {
        ...initialState,
        triesRemain: 1,
        isOver: false
      } as PuzzleState;
      service = createHangmanService(prepareState);

      // act
      service.guess('a');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        console.log(state.triesRemain);
        expect(state.isOver).toBeTruthy();
      });
    });

    it('should add letter to selectedKeys & puzzle when is correct', () => {
      // arrange
      const prepareState = {
        ...initialState,
        word: 'test',
        puzzle: ['', 'e', '', ''],
        selectedKeys: ['e'],
      } as PuzzleState;
      service = createHangmanService(prepareState);

      // act
      service.guess('t');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state).toEqual({
          puzzle: ['t', 'e', '', 't'],
          selectedKeys: ['e', 't'],
          triesRemain: 6,
          isOver: false,
          word: 'test'
        });
      });
    });

    it('should set game over when puzzle equals word', () => {
      // arrange
      const prepareState = {
        ...initialState,
        word: 'test',
        puzzle: ['t', 'e', '', 't'],
        selectedKeys: ['e', 't'],
      } as PuzzleState;
      service = createHangmanService(prepareState);

      // act
      service.guess('s');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state).toEqual({
          puzzle: ['t', 'e', 's', 't'],
          selectedKeys: ['e', 't', 's'],
          triesRemain: 6,
          isOver: true,
          word: 'test'
        });
      });
    });
  });
});

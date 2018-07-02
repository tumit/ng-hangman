import { of } from 'rxjs';

import { HangmanService, initialState, PuzzleState } from './hangman.service';
import { WordService } from './word.service';

describe('HangmanService', () => {

  const mockWordService = new WordService(undefined);
  mockWordService.get = () => of({ word: 'test' });
  let service: HangmanService;

  beforeEach(() => {
    service = new HangmanService(mockWordService);
    service.start();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initial puzzle state with new word', () => {
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
      service.guess('t');

      // act
      service.guess('t');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state).toEqual({
          puzzle: ['t', '', '', 't'],
          selectedKeys: ['t'],
          triesRemain: 6,
          isOver: false,
          word: 'test'
        });
      });
    });

    it('should add letter to selectedKeys & decrease triedRemain when is wrong', () => {
      // arrange
      service.guess('t');

      // act
      service.guess('a');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state).toEqual({
          puzzle: ['t', '', '', 't'],
          selectedKeys: ['t', 'a'],
          triesRemain: 5,
          isOver: false,
          word: 'test'
        });
      });
    });

    it('should set game over when triesRemain is zero', () => {
      // arrange
      service.guess('a');
      service.guess('b');
      service.guess('c');
      service.guess('d');
      service.guess('f');

      // act
      service.guess('g');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state.isOver).toBeTruthy();
      });
    });

    it('should add letter to selectedKeys & puzzle when is correct', () => {
      // arrange
      service.guess('e');

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
      service.guess('t');
      service.guess('e');

      // act
      service.guess('s');

      // assert
      const state$ = service.puzzleChanges();
      state$.subscribe(state => {
        expect(state).toEqual({
          puzzle: ['t', 'e', 's', 't'],
          selectedKeys: ['t', 'e', 's'],
          triesRemain: 6,
          isOver: true,
          word: 'test'
        });
      });
    });
  });
});

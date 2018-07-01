import { FieldPipe } from './field.pipe';
import { HangmanService, initialState } from '../services/hangman.service';
import { of } from 'rxjs';

describe('FieldPipe', () => {

  const mockHangmanService = new HangmanService(undefined);
  let pipe: FieldPipe;

  beforeEach(() => {
    pipe = new FieldPipe(mockHangmanService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  describe('transform', () => {
    it('should transform nothing when is not blank', () => {
      const result = pipe.transform('a', 0);
      expect(result).toBe('a');
    });

    it('should transform word when is over', () => {
      mockHangmanService.puzzleChanges = () => of({ ...initialState, isOver: true,  word: 'test'});
      pipe = new FieldPipe(mockHangmanService);
      const result = pipe.transform('', 0);
      expect(result).toBe('t');
    });

    it('should transform to space when is not over and blank', () => {
      mockHangmanService.puzzleChanges = () => of({ ...initialState, isOver: false});
      pipe = new FieldPipe(mockHangmanService);
      const result = pipe.transform('', 0);
      expect(result).toBe(' ');
    });

  });

});

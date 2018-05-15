import { TestBed, inject } from '@angular/core/testing';

import { HangmanService } from './hangman.service';
import { WordService } from './word.service';
import { Word } from '../models/word';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

describe('HangmanService', () => {
  let wordSpy: WordService;
  let service: HangmanService;

  beforeEach(() => {
    const wordObj = jasmine.createSpyObj('WordService', ['get']);
    wordObj.get.and.returnValue(of({ word: 'test' }));

    TestBed.configureTestingModule({
      providers: [
        HangmanService,
        { provide: WordService, useValue: wordObj }
      ]
    });

    wordSpy = TestBed.get(WordService);
    service = TestBed.get(HangmanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get word when start new game', () => {
    service.start();

    expect(wordSpy.get).toHaveBeenCalled();
  });

  it('should get initialize word when start new game', () => {
    const resultBefore = service.word();
    service.start();
    const resultAfter = service.word();

    expect(resultBefore).toEqual('');
    expect(resultAfter).toEqual('test');
  });

  it('should set number of try to 6 when initialized', () => {
    const result = service.triesRemain();

    expect(result).toEqual(6);
  });

  it('should return false and decrease number of try when give a wrong guess', () => {
    service.start();
    const guessResult = service.guess('a');
    const countResult = service.triesRemain();

    expect(guessResult).toEqual(false);
    expect(countResult).toEqual(5);
  });

  it('should return true and do not decrease number of try if guess correctly', () => {
    service.start();
    const guessResult = service.guess('e');
    const countResult = service.triesRemain();

    expect(guessResult).toEqual(true);
    expect(countResult).toEqual(6);
  });

  it('should not decrease number of try if repeated guess incorrectly', () => {
    service.start();
    service.guess('a');
    service.guess('a');
    service.guess('a');
    const countResult = service.triesRemain();

    expect(countResult).toEqual(5);
  });

  it('should game over if number of try is zero', () => {
    service.start();
    service.guess('a');
    service.guess('b');
    service.guess('c');
    service.guess('d');
    service.guess('f');
    service.guess('g');
    const countResult = service.triesRemain();
    const gameResult = service.isOver();

    expect(countResult).toEqual(0);
    expect(gameResult).toEqual(true);
  });

  it('should initialize puzzle', () => {
    service.start();
    const result = service.puzzle();

    expect(result).toEqual(['', '', '', '']);
  });

  it('should solve correct guest element', () => {
    service.start();
    service.guess('t');

    const result = service.puzzle();

    expect(result).toEqual(['t', '', '', 't']);
  });

  it('should keep solving correct guest element', () => {
    service.start();
    service.guess('t');
    service.guess('e');

    const result = service.puzzle();

    expect(result).toEqual(['t', 'e', '', 't']);
  });

  it('should game over if game solved', () => {
    service.start();
    service.guess('t');
    service.guess('e');
    service.guess('s');

    const puzzleResult = service.puzzle();
    const gameResult = service.isOver();

    expect(puzzleResult).toEqual(['t', 'e', 's', 't']);
    expect(gameResult).toEqual(true);
  });
});

import { FieldPipe } from './field.pipe';

describe('FieldPipe', () => {
  it('create an instance', () => {
    const hangman = jasmine.createSpyObj('HangmanService', ['getSolvedAt']);
    const pipe = new FieldPipe(hangman);
    expect(pipe).toBeTruthy();
  });
});

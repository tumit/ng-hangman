import { sandboxOf } from 'angular-playground';
import { HangmanComponent } from './hangman.component';
import { initialState, PuzzleState } from '../../services/hangman.service';

export default sandboxOf(HangmanComponent)
  .add('State: Win with some wrong', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, puzzle: ['t', 'e', 's', 't'], triesRemain: 5, isOver: true} as PuzzleState }
  })
  .add('State: Win without any wrong', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, puzzle: ['t', 'e', 's', 't'], triesRemain: 6, isOver: true} as PuzzleState }
  })
  .add('State: Remain 0', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, triesRemain: 0} as PuzzleState }
  })
  .add('State: Remain 1', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, triesRemain: 1} as PuzzleState }
  })
  .add('State: Remain 2', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, triesRemain: 2} as PuzzleState }
  })
  .add('State: Remain 3', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, triesRemain: 3} as PuzzleState }
  })
  .add('State: Remain 4', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, triesRemain: 4} as PuzzleState }
  })
  .add('State: Remain 5', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: {...initialState, triesRemain: 5} as PuzzleState }
  })
  .add('State: Initial', {
    template: `<app-hangman [puzz]="puzz"></app-hangman>`,
    context: { puzz: initialState as PuzzleState }
  });

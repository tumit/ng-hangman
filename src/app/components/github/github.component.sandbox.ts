import { sandboxOf } from 'angular-playground';
import { GithubComponent } from './github.component';

export default sandboxOf(GithubComponent)
  .add('default ', {
    template: `<app-github></app-github>`
  });

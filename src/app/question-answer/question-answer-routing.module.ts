import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionAnswerPage } from './question-answer.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionAnswerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionAnswerPageRoutingModule {}

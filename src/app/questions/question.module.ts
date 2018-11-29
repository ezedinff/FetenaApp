import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule
} from '@angular/material';
import {QuestionContainer} from './containers/question-container/question.container';
import {QuestionService} from './services/question.service';
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AddQuestion} from './components/add-question/add-question';
import {QuestionList} from './components/question-list/question-list';
import {QuestionListItem} from './components/question-list-item/question-list-item';
const routes: Routes = [
  {
    path: '',
    component: QuestionContainer,
    children: [
        {
          path: 'add/:id',
          component: AddQuestion
        },
        {
          path: 'list',
          component: QuestionList
        },
        {path: '', redirectTo: 'list', pathMatch: 'full'},
      ]
  }
];
@NgModule({
  declarations: [QuestionContainer, AddQuestion, QuestionList, QuestionListItem],
  exports: [QuestionContainer, RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule
  ],
  providers: [QuestionService]
})
export class QuestionModule { }

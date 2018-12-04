import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
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
import {SubjectContainer} from './containers/subject-container/subject.container';
import {SubjectService} from './services/subject.service';
import {AddSubjectComponent} from './components/add-subject/add-subject.component';
const routes: Routes = [
  {
    path: '',
    component: SubjectContainer,
    children: [
        {
          path: 'list/:name',
          component: QuestionList
        }
      ]
  }
];
@NgModule({
  declarations: [SubjectContainer, QuestionContainer, AddSubjectComponent, AddQuestion, QuestionList, QuestionListItem],
  exports: [SubjectContainer, QuestionContainer, RouterModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule
  ],
  providers: [QuestionService, SubjectService],
  entryComponents: [AddQuestion, AddSubjectComponent]
})
export class QuestionModule { }

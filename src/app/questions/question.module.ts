import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {QuestionContainer} from './containers/question-container/question.container';
import {QuestionService} from './services/question.service';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireDatabase, AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
@NgModule({
  declarations: [QuestionContainer],
  exports: [QuestionContainer, RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild([{path: '', component: QuestionContainer}]),
    AngularFireAuthModule
  ],
  providers: [QuestionService]
})
export class QuestionModule { }

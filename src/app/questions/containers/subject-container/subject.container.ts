import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Observable} from 'rxjs';
import {Question} from '../../interfaces/question';
import {SubjectService} from '../../services/subject.service';
import {MatDialog} from '@angular/material';
import {AddQuestion} from '../../components/add-question/add-question';
import {AddSubjectComponent} from '../../components/add-subject/add-subject.component';

@Component({
  selector: 'subject-container',
  templateUrl: './subject.container.html',
  styles: ['::ng-deep .mat-list-item-content {padding: 0 !important;} ::ng-deep .active {background-color: #673ab7 !important; color: #fff !important;}']
})
export class SubjectContainer implements OnInit {
  questions$: Observable<Question[]>;
  subjects$;
  constructor(private questionService: QuestionService,
              private subjectService: SubjectService,
              private matDialog: MatDialog) {}
  getQuestions(subject_name) {
    this.questions$ = this.questionService.getQuestions(subject_name).valueChanges();
  }
  openDialog(actionType) {
    this.matDialog.open(AddSubjectComponent, {
      data: {action: actionType['action']},
      width: '400px', maxWidth: '100vw', height: 'auto', disableClose: true});
  }
  ngOnInit(): void {
    this.subjects$ = this.subjectService.getSubjects().valueChanges();
  }
}

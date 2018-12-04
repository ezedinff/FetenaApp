import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Observable} from 'rxjs';
import {Question} from '../../interfaces/question';
import {MatDialog} from '@angular/material';
import {AddQuestion} from '../add-question/add-question';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.html'
})
export class QuestionList implements OnInit {
  questions$: Observable<Question[]>;
  subject_name: string;
  constructor(private questionService: QuestionService, private matDialog: MatDialog, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
        this.questions$ = this.questionService.getQuestions(params['name']).valueChanges();
        this.subject_name = params['name'];
      }
    );
  }

  ngOnInit(): void {
  }
  openDialog(actionType) {
    if (actionType['action']) {
      if (actionType['action'] !== 'delete') {
        this.matDialog.open(AddQuestion, {
          data: {action: actionType['action'], subject_name: this.subject_name, question: actionType['question']},
          width: '400px', maxWidth: '100vw', height: 'auto', disableClose: true});
      } else {
        this.questionService.deleteQuestion(actionType['question']);
      }
    } else {
      if (actionType !== 'delete') {
        this.matDialog.open(AddQuestion, {
          data: {action: actionType, subject_name: this.subject_name},
          width: '400px', maxWidth: '100vw', height: 'auto', disableClose: true});
      }
    }
  }
}

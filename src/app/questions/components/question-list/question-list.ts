import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Observable} from 'rxjs';
import {Question} from '../../interfaces/question';
import {MatDialog} from '@angular/material';
import {AddQuestion} from '../add-question/add-question';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.html'
})
export class QuestionList implements OnInit {
  questions$: Observable<Question[]>;
  constructor(private questionService: QuestionService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.questions$ = this.questionService.getQuestions().valueChanges();
  }
  openDialog(actionType) {
    if (actionType['action']) {
      if (actionType['action'] !== 'delete') {
        this.matDialog.open(AddQuestion, {
          data: {action: actionType['action'], question: actionType['question']},
          width: '400px', maxWidth: '100vw', height: 'auto', disableClose: true});
      }
    } else {
      if (actionType !== 'delete') {
        this.matDialog.open(AddQuestion, {
          data: {action: actionType},
          width: '400px', maxWidth: '100vw', height: 'auto', disableClose: true});
      }
    }
  }
}

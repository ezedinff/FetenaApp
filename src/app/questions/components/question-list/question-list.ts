import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Observable} from 'rxjs';
import {Question} from '../../interfaces/question';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.html'
})
export class QuestionList implements OnInit {
  questions$: Observable<Question[]>;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questions$ = this.questionService.getQuestions().valueChanges();
  }
}

import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../interfaces/question';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'question-container',
  templateUrl: './question.container.html',
  styles: ['::ng-deep .mat-form-field-flex{ background-color: #f5f5f5; padding: 0 16px;}']
})
export class QuestionContainer implements OnInit {

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.getQuestions().valueChanges().subscribe(questions => console.log(questions));
  }

  submit(form) {
    const data: Question = {
      question: form.value.question,
      options: {
        a: form.value.option_a,
        b: form.value.option_b,
        c: form.value.option_c,
        d: form.value.option_d
      }
    };
    this.questionService.createQuestion(data);
  }
}

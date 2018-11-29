import {Component} from '@angular/core';
import {Question} from '../../interfaces/question';
import {QuestionService} from '../../services/question.service';

@Component({
  selector: 'add-question',
  templateUrl: './add-question.html'
})
export class AddQuestion {
  constructor(private questionService: QuestionService) {}
  submit(form) {
    const data: Question = {
      question: form.value.question,
      options: [
        form.value.option_a,
        form.value.option_b,
        form.value.option_c,
        form.value.option_d
      ]
    };
    this.questionService.createQuestion(data);
  }
}

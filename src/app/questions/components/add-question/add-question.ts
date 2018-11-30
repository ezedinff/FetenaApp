import {Component, Inject, OnInit} from '@angular/core';
import {Question} from '../../interfaces/question';
import {QuestionService} from '../../services/question.service';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'add-question',
  templateUrl: './add-question.html',
  styles: ['::ng-deep .mat-dialog-container{ padding: 0 0 5em; overflow: hidden; }']
})
export class AddQuestion implements OnInit{
  title: string;
  constructor(private questionService: QuestionService,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
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

  ngOnInit(): void {
    this.title = this.data['action'] === 'create' ? 'Create New Question' : 'Edit Question';
  }
}

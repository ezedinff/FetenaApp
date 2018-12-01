import {Component, Inject, OnInit} from '@angular/core';
import {Question} from '../../interfaces/question';
import {QuestionService} from '../../services/question.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'add-question',
  templateUrl: './add-question.html',
  styles: ['::ng-deep .mat-dialog-container{ padding: 0 0 5em; overflow: hidden; }']
})
export class AddQuestion implements OnInit{
  title: string;
  question: Question;
  questionForm: FormGroup;
  private questionControls = {
    question: ['', Validators.required],
    option_a: ['', Validators.required],
    option_b: ['', Validators.required],
    option_c: ['', Validators.required],
    option_d: ['', Validators.required]
  };
  constructor(private questionService: QuestionService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {}
  submit() {
    const data: Question = {
      question: this.questionForm.value.question,
      options: [
        this.questionForm.value.option_a,
        this.questionForm.value.option_b,
        this.questionForm.value.option_c,
        this.questionForm.value.option_d
      ]
    };
    if (this.data['action'] === 'create') { this.questionService.createQuestion(data); }
  }
  createForm() {
    this.questionForm = this.fb.group(this.questionControls);
    if (this.data['action'] === 'edit') {
      this.questionForm.patchValue({
        question: this.question['question'],
        option_a: this.question['options'][0],
        option_b: this.question['options'][1],
        option_c: this.question['options'][2],
        option_d: this.question['options'][3]
      });
    }
  }
  ngOnInit(): void {
    this.title = this.data['action'] === 'create' ? 'Create New Question' : 'Edit Question';
    if (this.data['action'] === 'edit') { this.question = this.data['question']; console.log(this.question); }
    this.createForm();
  }
}

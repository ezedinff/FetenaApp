import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../../interfaces/question';

@Component({
  selector: 'question-list-item',
  templateUrl: './question-list-item.html'
})
export class QuestionListItem implements OnInit {
  @Input() question: Question;
  @Input() questionIndex;
  @Output() actionPerformed = new EventEmitter();
  options = ['a', 'b', 'c', 'd'];
  number = 0;
  ngOnInit(): void {
    this.number = Number(this.questionIndex) + 1;
    console.log(this.questionIndex);
  }
  sendAction(action) {
    this.actionPerformed.emit({action: action, question: this.question});
  }
}


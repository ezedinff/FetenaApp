import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Question} from '../interfaces/question';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable()
export class QuestionService {
  questions$;

  constructor(private afd: AngularFirestore) {
    this.questions$ = this.getQuestions();
  }

  getQuestions() {
    return this.afd.collection('questions');
  }

  createQuestion(question: any) {
    this.questions$.add(question);
  }

}

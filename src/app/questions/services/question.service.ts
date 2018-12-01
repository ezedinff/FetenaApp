import {Injectable} from '@angular/core';
import {Question} from '../interfaces/question';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable()
export class QuestionService {
  private questions$: AngularFirestoreCollection<Question>;

  constructor(private afd: AngularFirestore) {
    this.questions$ = this.getQuestions();
  }

  getQuestions() {
    return this.afd.collection<Question>('questions');
  }

  createQuestion(question: any) {
    this.questions$.add(question);
  }
  deleteQuestion(question) {
    const q = this.afd.doc(`questions/${question.$key}`);
    console.log(q, question.$key);
  }

}

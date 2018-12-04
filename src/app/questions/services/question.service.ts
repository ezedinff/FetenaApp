import {Injectable} from '@angular/core';
import {Question} from '../interfaces/question';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

@Injectable()
export class QuestionService {
  private questions$: AngularFirestoreCollection<Question>;

  constructor(private afd: AngularFirestore) {
  }

  getQuestions(subject_name) {
    return this.afd.collection<Question>(`/subjects/${subject_name}/questions`);
  }

  createQuestion(question: any, subject_name) {
    this.getQuestions(`${subject_name}`).add(question);
  }
  deleteQuestion(question) {
    const q = this.afd.doc(`questions/${question.$key}`);
    console.log(q, question.$key);
  }

}

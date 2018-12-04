import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Subject} from '../interfaces/subject';

@Injectable()
export class SubjectService {
  private subjects$: AngularFirestoreCollection<Subject>;
  constructor(private afd: AngularFirestore) {
    this.subjects$ = this.getSubjects();
  }
  getSubjects() {
    return this.afd.collection<Subject>('subjects');
  }
  createSubject(subject: Subject) {
    this.subjects$.add(subject);
  }
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {Question} from '../../interfaces/question';
import {QuestionService} from '../../services/question.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FroalaEditorDirective} from 'angular-froala-wysiwyg';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

declare var $: any;

@Component({
  selector: 'add-question',
  templateUrl: './add-question.html',
  styles: ['::ng-deep .mat-dialog-container{ padding: 0 0 5em; overflow: hidden; }']
})
export class AddQuestion implements OnInit {
  title: string;
  question: Question;
  questionForm: FormGroup;
  id: number;
  subjectname: string;
  configOptionsForEditor = {
    placeholder: 'Question',
    imageUpload: true,
    charCounterCount: true,
    imageUploadMethod: 'POST',
    events: {
      'froalaEditor.image.beforeUpload' : function(e, editor, images) {
        let uploadTask: firebase.storage.UploadTask;
        const time = Date.now();
        const storageRef = firebase.storage().ref();
        const path = `test/${time}`;
        uploadTask = storageRef.child(path).put(images[0]);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (error) => {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              editor.image.insert(downloadURL, null, null, editor.image.get());
            });
          },
          () => {
            this.downloadURL = uploadTask.snapshot.downloadURL;
            console.log(uploadTask.snapshot.downloadURL);
          });
        return false;
      }
    }
  };
  private questionControls = {
    question: ['', Validators.required],
    option_a: ['', Validators.required],
    option_b: ['', Validators.required],
    option_c: ['', Validators.required],
    option_d: ['', Validators.required]
  };

  constructor(private questionService: QuestionService,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      this.subjectname = params['name'];
    });
  }

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
    console.log(data);
    if (this.id === 0) {
      this.questionService.createQuestion(data, this.subjectname);
    }
  }

  createForm() {
    this.questionForm = this.fb.group(this.questionControls);
    if (this.id !== 0) {
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
    this.title = this.id === 0 ? 'Create New Question' : 'Edit Question';
    // if (this.id !== 0) { this.question = this.data['question']; console.log(this.question); }
    this.createForm();
  }

  back() {
    this.location.back();
  }
}

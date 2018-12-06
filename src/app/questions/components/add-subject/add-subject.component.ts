import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../interfaces/subject';

@Component({
  selector: 'add-subject-component',
  templateUrl: './add-subject.component.html',
  styles: ['::ng-deep .mat-dialog-container{ padding: 0 0 5em !important; overflow: hidden !important; }']
})
export class AddSubjectComponent implements OnInit{
  title = 'Create New Subject';
  subjectForm: FormGroup;
  private subjectControls = {
    name: ['', Validators.required]
  };
  constructor(private subjectService: SubjectService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.subjectForm = this.fb.group(this.subjectControls);
  }
  submit() {
    const data: Subject = {
      name: this.subjectForm.get('name').value
    };
    this.subjectService.createSubject(data);
  }
}

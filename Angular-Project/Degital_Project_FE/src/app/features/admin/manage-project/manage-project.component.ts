import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { projectService } from '../../../core/services/project.service';
import { ProjectModel } from '../../../core/models/project.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterLink],

  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export class ManageProjectComponent implements OnInit {
  listProjectModel: ProjectModel[] = [];
  currentPage = 1;
  pageSize = 10;
  key = "";
  structuralEngineer = "";
  postingStartDate: string = "";
  postingEndDate: string = "";
  totalRecords = 0;
  totalPages = 0;
  subjectForm: FormGroup;

  constructor(private projectService: projectService, private fb: FormBuilder) {

    this.getListProject();
    this.subjectForm = this.fb.group({
      postingStartDate: '',
      postingEndDate: '',
      structuralEngineer: '',
      key: '',
      pageNumber: 1,
      pageSize: 10
    })
  }

  ngOnInit(): void { }

  getListProject() {
    this.projectService
      .getListProject(this.key, this.structuralEngineer, this.postingStartDate, this.postingEndDate, this.currentPage, this.pageSize)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.listProjectModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        },
        error: (err) => { },
      });
  }

  onDelete(id: number) {
    this.projectService.deleteProject(id).subscribe(res => {
      this.getListProject();
    })
    alert('click on button ' + id);
  }
  onSubmit() {
const form = this.subjectForm.value;
  this.projectService
    .getListProject(form.key, form.structuralEngineer, form.postingStartDate, form.postingEndDate, form.pageNumber, form.pageSize)
    .subscribe({
      next: (res: any) => {
        this.listProjectModel = res.data;
        this.totalRecords = res.totalCount;
        this.totalPages = Math.ceil(this.totalRecords / form.pageSize);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}

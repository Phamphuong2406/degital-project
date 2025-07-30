import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { projectService } from '../../../core/services/project.service';
import { ProjectModel } from '../../../core/models/project.models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss'
})
export class ManageProjectComponent implements OnInit {
  listProjectModel: ProjectModel[] = [];
  currentPage = 1;
  pageSize = 3;
  key = "";
  structuralEngineer = "";
  postingStartDate: string = "2025-07-29T00:00:00";
  postingEndDate: string = "2025-07-31T00:00:00";
  totalRecords = 0;
  totalPages = 0;
subjectForm:FormGroup;
  
  constructor(private projectService: projectService,  private fb: FormBuilder ) { 

 this.getListProject();
    this.subjectForm = new FormGroup({

    })
  }

  ngOnInit(): void {
   
  }

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
    this.projectService.deleteProject(id).subscribe(res =>{
      this.getListProject();
    })
    alert('click on button '+ id);
  }
  onSubmit(){
    console.log(this.subjectForm.value);
  }

}


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { projectService } from '../../../../core/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss',
})
export class ProjectAddComponent {
  projectAddForm: FormGroup;
  submited: boolean = false;
  srcResult: any = null;
  constructor(
    private fb: FormBuilder,
    private projectSv: projectService,
    private _router: Router
  ) {
    this.projectAddForm = this.fb.group({
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      avatar: [null, Validators.required],
      shortDescription: ['', Validators.required],
      detailedDescription: ['', Validators.required],
      architect: ['', Validators.required],
      structuralEngineer: ['', Validators.required],
      constructionStartTime: ['', Validators.required],
      constructionEndTime: ['', Validators.required],
      displayOnhome: [false, Validators.required],
      displayOrderOnHome: 0,
      displayOnHeader: [false, Validators.required],
      displayOrderOnHeader: 0,
      expirationTimeOnHeader: ['', Validators.required],
      idPoster: 1,
    });
  }

  ngOnInit(): void {}
  get f() {
    return this.projectAddForm.controls;
  }
  onSubmit(): any {
    this.submited = true;
    if (this.projectAddForm.invalid) {
      return false;
    }
    console.log(this.projectAddForm.value);
    //add
    this.projectSv
      .createNewProject(this.projectAddForm.value)
      .subscribe((res) => {
        this._router.navigate(['admin/project']);
      });
  }

  uploadFile(event: any) {
    const file = event.currentTarget.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
  }

  selectedFile: any = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent {
  projectEditForm: FormGroup;
  submited: boolean = false;
  srcResult: any = null;
  prId: number = 0;

  constructor(
    private fb: FormBuilder,
    private projectSv: ProjectService,
    private router: Router,
    private _router: ActivatedRoute
  ) {
    this.projectEditForm = this.fb.group({
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      avatar: [null, Validators.required],
      shortDescription: ['', Validators.required],
      detailedDescription: ['', Validators.required],
      architect: ['', Validators.required],
      structuralEngineer: ['', Validators.required],
      constructionStartTime: ['', Validators.required],
      constructionEndTime: ['', Validators.required],
      displayOnhome: false,
      displayOrderOnHome: 0,
      displayOnHeader: false,
      displayOrderOnHeader: 0,
      expirationTimeOnHeader: [''],
      idPoster: 1,
    });
  }

  ngOnInit(): void {
    this._router.paramMap.subscribe((query) => {
      const idParam = query.get('id');

      if (idParam !== null) {
        const id = +idParam; // ép kiểu sang number
        this.prId = id;

        this.projectSv.getProjectById(id).subscribe((res) => {
          const project = res;
          this.prId = project.projectId;

          this.projectEditForm = this.fb.group({
            projectId: [project.projectId, Validators.required],
            projectName: [project.projectName, Validators.required],
            projectType: [project.projectType, Validators.required],
            avatar: [project.avatarUrl, Validators.required],
            shortDescription: [project.shortDescription, Validators.required],
            detailedDescription: [
              project.detailedDescription,
              Validators.required,
            ],
            architect: [project.architect, Validators.required],
            structuralEngineer: [
              project.structuralEngineer,
              Validators.required,
            ],
            constructionStartTime: [
              new Date(project.constructionStartTime)
                .toISOString()
                .slice(0, 10),
              Validators.required,
            ],
            constructionEndTime: [
              new Date(project.constructionEndTime).toISOString().slice(0, 10),
              Validators.required,
            ],
            displayOnhome: [project.displayOrderOnHome, Validators.required],
            displayOrderOnHome: project.displayOrderOnHome,
            displayOnHeader: [project.displayOnHeader, Validators.required],
            displayOrderOnHeader: project.displayOrderOnHeader,
            expirationTimeOnHeader: [
              new Date(project.expirationTimeOnHeader)
                .toISOString()
                .slice(0, 10),
              Validators.required,
            ],
            idPoster: project.idPoster,
          });
        });
      }
    });
  }

  get f() {
    return this.projectEditForm.controls;
  }

  onSubmit(): any {
    this.submited = true;

    if (this.projectEditForm.invalid) {
      console.log(this.projectEditForm.value);
      return false;
    }

    if (!this.prId) {
      console.error('Project ID is missing!');
      return;
    }

    const formData = new FormData();

    Object.keys(this.projectEditForm.controls).forEach((key) => {
      const control = this.projectEditForm.get(key);
      if (!control) return;

      let value = control.value;

      if (typeof value === 'boolean') {
        value = value ? 'true' : 'false';
      }

      if (key.includes('Time') && value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          value = date.toISOString();
        }
      }

      formData.append(key, value);
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    this.projectSv.updateProject(formData, this.prId).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['project']);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.projectEditForm.patchValue({ avatar: file });
      this.projectEditForm.get('avatar')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.srcResult = reader.result;
      };
    }
  }
}

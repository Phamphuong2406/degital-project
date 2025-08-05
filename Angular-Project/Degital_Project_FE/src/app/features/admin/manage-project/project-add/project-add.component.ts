import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectService } from '../../../../core/services/project.service';
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
    private projectSv: ProjectService,
    private router: Router
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
      displayOnhome: [false],
      displayOrderOnHome: 0,
      displayOnHeader: [false],
      displayOrderOnHeader: 0,
      expirationTimeOnHeader: ['', Validators.required],
      idPoster: 1,
    });
  }

  ngOnInit(): void {}
  avatarurl = 'assets/Images/empty.png';
  get f() {
    return this.projectAddForm.controls;
  }

  onSubmit(): any {
    this.submited = true;
    if (this.projectAddForm.invalid) {
      console.log(this.projectAddForm.value);
      return false;
    }

    const formData = new FormData();

    Object.keys(this.projectAddForm.controls).forEach((key) => {
      const control = this.projectAddForm.get(key);
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

    this.projectSv.createNewProject(formData).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['admin/project']);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.projectAddForm.patchValue({ avatar: file });
      this.projectAddForm.get('avatar')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        // this.srcResult = reader.result;
        this.avatarurl = event.target.result;
      };
    }
  }
}

import { Component, OnInit } from '@angular/core';
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
export class ProjectEditComponent implements OnInit {
  projectEditForm: FormGroup;
  submited = false;
  srcResult: any = null;
  prId = 0;
  avatarurl = 'assets/Images/empty.png';
  avatarOldName = '';
  avatarFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private projectSv: ProjectService,
    private router: Router,
    private _router: ActivatedRoute
  ) {
    this.projectEditForm = this.fb.group({
      projectName: ['', Validators.required],
      projectType: ['', Validators.required],
      avatar: [null],
      avatarOld: [''],
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
      if (!idParam) return;

      this.prId = +idParam;

      this.projectSv.getProjectById(this.prId).subscribe((project) => {
        this.avatarOldName = project.avatarUrl || '';
        this.avatarurl = project.avatarUrl
          ? 'https://localhost:7132/Uploads/' + project.avatarUrl
          : 'assets/Images/empty.png';

        this.projectEditForm.patchValue({
          projectName: project.projectName,
          projectType: project.projectType,
          avatarOld: project.avatarUrl,
          shortDescription: project.shortDescription,
          detailedDescription: project.detailedDescription,
          architect: project.architect,
          structuralEngineer: project.structuralEngineer,
          constructionStartTime: new Date(project.constructionStartTime)
            .toISOString()
            .slice(0, 10),
          constructionEndTime: new Date(project.constructionEndTime)
            .toISOString()
            .slice(0, 10),
          displayOnhome: project.displayOnHome,
          displayOrderOnHome: project.displayOrderOnHome,
          displayOnHeader: project.displayOnHeader,
          displayOrderOnHeader: project.displayOrderOnHeader,
          expirationTimeOnHeader: new Date(project.expirationTimeOnHeader)
            .toISOString()
            .slice(0, 10),
          idPoster: project.idPoster,
        });
      });
    });
  }

  get f() {
    return this.projectEditForm.controls;
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.avatarFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.avatarurl = e.target.result;
        this.srcResult = e.target.result;
      };
    } else {
      this.avatarFile = null;
    }
  }

  onSubmit(): void {
    this.submited = true;

    if (this.projectEditForm.invalid) {
      console.log(this.projectEditForm.value);
      return;
    }

    const formData = new FormData();

    // Thêm các field khác vào formData (trừ avatar)
    Object.keys(this.projectEditForm.controls).forEach((key) => {
      if (key === 'avatar') return;

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

    // avatar xử lý riêng
    if (this.avatarFile) {
      console.log('Avatar File:', this.avatarFile);

      formData.append('avatar', this.avatarFile); // Gửi file mới
    } else {
      formData.append('avatar', ''); // Gửi avatar là rỗng
    }

    // avatarOld luôn gửi
    formData.append(
      'avatarOld',
      this.projectEditForm.get('avatarOld')?.value || ''
    );

    this.projectSv.updateProject(formData, this.prId).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['admin/project']);
    });
  }
}

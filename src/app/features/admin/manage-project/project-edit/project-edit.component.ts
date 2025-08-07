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
import {
  CKEditorCloudResult,
  CKEditorModule,
  loadCKEditorCloud,
} from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, EditorConfig } from 'ckeditor5';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CKEditorModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.scss',
})
export class ProjectEditComponent implements OnInit {
  public Editor: typeof ClassicEditor | null = null;

  public config: EditorConfig | null = null;
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
        this.avatarOldName = project.avatarUrl  ,'';
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
    loadCKEditorCloud({
      version: '46.0.0',
      premium: true,
    }).then(this._setupEditor.bind(this));
  }
  private _setupEditor(
    cloud: CKEditorCloudResult<{ version: '46.0.0'; premium: true }>
  ) {
    const {
      ClassicEditor,
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Image,
      ImageToolbar,
      ImageUpload,
      Base64UploadAdapter,
      Alignment,
    } = cloud.CKEditor;

    this.Editor = ClassicEditor;

    this.config = {
      licenseKey:
        'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3ODI2MDQ3OTksImp0aSI6IjU2ZjllNGJlLTg4YWEtNDQ3OS04ZGJlLTg0YjI4YmZmNmIyMCIsImxpY2Vuc2VkSG9zdHMiOlsiMTI3LjAuMC4xIiwibG9jYWxob3N0IiwiMTkyLjE2OC4qLioiLCIxMC4qLiouKiIsIjE3Mi4qLiouKiIsIioudGVzdCIsIioubG9jYWxob3N0IiwiKi5sb2NhbCJdLCJ1c2FnZUVuZHBvaW50IjoiaHR0cHM6Ly9wcm94eS1ldmVudC5ja2VkaXRvci5jb20iLCJkaXN0cmlidXRpb25DaGFubmVsIjpbImNsb3VkIiwiZHJ1cGFsIl0sImxpY2Vuc2VUeXBlIjoiZGV2ZWxvcG1lbnQiLCJmZWF0dXJlcyI6WyJEUlVQIiwiRTJQIiwiRTJXIl0sInZjIjoiMjliN2IyM2MifQ.dTSFMotYmLwSAUQNYrlFZN0hYSjltMa2aQCOgr487dt6hbVlP5zaESA6XDcF_hIu7CmLTNxaUVQ9c0EUKBWVDA',

      plugins: [
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Alignment,
        Image,
        ImageToolbar,
        ImageUpload,
        Base64UploadAdapter,
      ],

      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'alignment:left',
          'alignment:right',
          '|',
          'imageUpload',
          '|',
          'undo',
          'redo',
        ],
      },

      image: {
        toolbar: [
          'imageTextAlternative',
          'imageStyle:inline',
          'imageStyle:block',
          'imageStyle:side',
        ],
      },
    };
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
      this.projectEditForm.get('avatarOld')?.value  ,''
    );

    this.projectSv.updateProject(formData, this.prId).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['admin/project']);
    });
  }
}

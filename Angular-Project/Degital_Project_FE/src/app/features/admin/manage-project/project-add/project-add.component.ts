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
import {
  CKEditorCloudResult,
  CKEditorModule,
  loadCKEditorCloud,
} from '@ckeditor/ckeditor5-angular';
import { ClassicEditor, EditorConfig } from 'ckeditor5';

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CKEditorModule],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss',
})
export class ProjectAddComponent {
  public Editor: typeof ClassicEditor | null = null;

  public config: EditorConfig | null = null;

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

  ngOnInit(): void {
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

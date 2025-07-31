import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-add.component.html',
  styleUrl: './project-add.component.scss'
})
export class ProjectAddComponent {
  projectAddForm: FormGroup;
  constructor(private fb: FormBuilder) {

    this.projectAddForm = this.fb.group({
      projectName: '',
      projectType: '',
      avataUrl: '',
      shortDescription: '',
      detailedDescription: '',
      architect: '',
      structuralEngineer: '',
      constructionStartTime: '',
      constructionEndTime: '',
      postedTime: Date,
      displayOnhome: '',
      displayOrderOnHome: '',
      displayOnHeader: 'boolean',
      displayOrderOnHeader: '',
      expirationTimeOnHeader: Date
    })


  }

  ngOnInit(): void {

  }
}

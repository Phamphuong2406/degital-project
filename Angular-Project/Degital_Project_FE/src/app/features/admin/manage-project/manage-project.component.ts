import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectModel } from '../../../core/models/project.models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manage-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manage-project.component.html',
  styleUrl: './manage-project.component.scss',
})
export class ManageProjectComponent implements OnInit {
  listProjectModel: ProjectModel[] = [];
  noData: boolean = false;

  currentPage = 1;
  pageSize = 10;

  totalRecords = 0;
  totalPages = 0;

  subjectForm: FormGroup;

  constructor(private projectService: ProjectService, private fb: FormBuilder) {
    this.subjectForm = this.fb.group({
      key: [''],
      structuralEngineer: [''],
      postingStartDate: [''],
      postingEndDate: [''],
    });
  }

  ngOnInit(): void {
    this.loadProject();
  }

  loadProject(): void {
    const form = this.subjectForm.value;
    this.projectService
      .getListProject(
        form.key,
        form.structuralEngineer,
        form.postingStartDate,
        form.postingEndDate,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (res: any) => {
          this.listProjectModel = res.data;
          this.totalRecords = res.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.noData = res.data.length === 0;
        },
        error: (err) => {
          console.error(err);
          this.noData = true;
        },
      });
  }

  onDelete(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProject();
      });
    }
  }

  onSubmit(): void {
    this.currentPage = 1; // Reset về trang 1 khi tìm kiếm mới
    this.loadProject();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProject();
    }
  }
}

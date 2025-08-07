import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectSummary } from '../../../core/models/project.models';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-ourproject',
  standalone: false,
  templateUrl: './ourproject.component.html',
  styleUrls: ['./ourproject.component.scss']  // Sửa ở đây
})
export class OurprojectComponent implements OnInit {
  loading = false;
  homeProjects: ProjectSummary[] = [];
public Editor = ClassicEditor;
  public modelContent = '';
  constructor(
    private projectService: ProjectService,
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.getProjectsDisplayedOnOurProject().subscribe({
      next: response => {
        // Tùy vào dữ liệu từ API: nếu là `response.data` hoặc chỉ `response`
        const data = Array.isArray(response) ? response : response.data;

        this.homeProjects = data
          .sort((a, b) => a.displayOrderOnHeader - b.displayOrderOnHeader)
          .map(p => ({
            ...p,
            avatarUrl: p.avatarUrl.startsWith('http')
              ? p.avatarUrl
              : `https://localhost:7132/Uploads/${p.avatarUrl}`
          }));

        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  viewProject(id: number) {

  }
}



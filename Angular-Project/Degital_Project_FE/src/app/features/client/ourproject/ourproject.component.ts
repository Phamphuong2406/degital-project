import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectSummary } from '../../../core/models/project.models';

@Component({
  selector: 'app-ourproject',
  standalone: false,
  templateUrl: './ourproject.component.html',
  styleUrls: ['./ourproject.component.scss']
})
export class OurprojectComponent implements OnInit {
  loading = false;
  homeProjects: ProjectSummary[] = [];
  selectedProject: ProjectSummary | null = null;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.loading = true;
    this.projectService.getProjectsDisplayedOnOurProject().subscribe({
      next: response => {
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
    this.projectService.getProjectsDisplayedOnProjectDetail(id).subscribe({
      next: response => {
        this.selectedProject = {
          ...response,
          avatarUrl: response.avatarUrl.startsWith('http')
            ? response.avatarUrl
            : `https://localhost:7132/Uploads/${response.avatarUrl}`
        };
        console.log(this.selectedProject);
      },
      error: err => {
        console.error(err);
      }
    });
  }

}

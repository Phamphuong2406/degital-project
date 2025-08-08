import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectSummary } from '../../../core/models/project.models';

@Component({
  selector: 'app-ourproject',
  standalone:false,
  templateUrl: './ourproject.component.html',
  styleUrls: ['./ourproject.component.scss']
})
export class OurprojectComponent implements OnInit {
  projects: ProjectSummary[] = [];

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjectsDisplayedOnOurProject(1, 3).subscribe({
      next: (response) => {
        this.projects = response.data;
        console.log('✅ Projects loaded:', this.projects);
      },
      error: (err) => {
        console.error('❌ Error loading projects:', err);
      }
    });
  }

  viewProject(id: number): void {
    this.router.navigate(['/project-detail', id]);
  }

  getImageUrl(avatarUrl: string): string {
    return `https://localhost:7132/uploads/${avatarUrl}`;
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../../core/services/project.service';
import { ProjectModel } from '../../../../core/models/project.models';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project: ProjectModel | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
console.error('test');

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      console.log(id);

      if (!id) {
        console.error('Không tìm thấy ID trong URL');
        this.loading = false;
        return;
      }

      this.projectService.getProjectsDisplayedOnProjectDetail(+id).subscribe({
        next: (data) => {
          this.project = data;
          this.loading = false;
          console.log('Chi tiết project:', data);
        },
        error: (err) => {
          console.error('Lỗi load chi tiết project:', err);
          this.loading = false;
        }
      });
    });
  }
}

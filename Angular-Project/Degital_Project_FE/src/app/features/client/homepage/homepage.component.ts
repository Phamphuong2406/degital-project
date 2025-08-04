import { Component, OnInit } from '@angular/core';
import { SlideInterface } from '../../../imageSlider/types/slide.interface';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectDisplayedOnHeaderItem, ProjectSummary } from '../../../core/models/project.models';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  headerProjects: ProjectDisplayedOnHeaderItem[] = [];
  homeProjects: ProjectSummary[] = [];
  loadingHeader = false;
  loadingHome = false;
  error?: string;

  slides: SlideInterface[] = [
    { url: 'assets/Images/top.png', title: 'image1', number: 1 },
    { url: 'assets/Images/top3-2.png', title: 'image2', number: 2 },
    { url: 'assets/Images/top3-3.png', title: 'image3', number: 3 },
  ];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadHeaderProjects();
    this.loadHomeProjects();
  }

  loadHeaderProjects() {
    this.loadingHeader = true;
    this.projectService.getProjectsDisplayedOnHeader(1, 3).subscribe({
      next: res => {
        this.headerProjects = res.data
          .sort((a, b) => a.displayOrderOnHeader - b.displayOrderOnHeader);
        this.loadingHeader = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Không tải được header projects';
        this.loadingHeader = false;
      }
    });
  }

  loadHomeProjects() {
    this.loadingHome = true;
    this.projectService.getProjectsDisplayedOnHomePage().subscribe({
      next: projects => {
        this.homeProjects = projects
          .sort((a, b) => a.displayOrderOnHome - b.displayOrderOnHome);
        this.loadingHome = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Không tải được home projects';
        this.loadingHome = false;
      }
    });
  }

  viewProject(id: number) {

  }

  sendContact(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const payload = {
    name: formData.get('name')?.toString().trim(),
    phone: formData.get('phone')?.toString().trim(),
    email: formData.get('email')?.toString().trim(),
    interestedIn: formData.get('interestedin')?.toString().trim(),
    message: formData.get('message')?.toString().trim(),
  };

  // simple validation
  if (!payload.name || !payload.email) {
    this.error = 'Vui lòng điền tối thiểu tên và email.';
    return;
  }

  console.log('Contact submitted', payload);
  this.error = undefined;
  alert('Cảm ơn! Chúng tôi đã nhận được tin nhắn của bạn.');
  form.reset();
}
}

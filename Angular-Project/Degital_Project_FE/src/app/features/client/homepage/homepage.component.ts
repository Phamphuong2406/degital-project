import { Component, OnInit } from '@angular/core';
import { SlideInterface } from '../../../imageSlider/types/slide.interface';
import { ProjectService } from '../../../core/services/project.service';
import { ProjectDisplayedOnHeaderItem, ProjectSummary } from '../../../core/models/project.models';
import { ContactService } from '../../../core/services/contact.service';
import { ContactCreateModel } from '../../../core/models/contact.models';

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  submitted = false;
  headerProjects: ProjectDisplayedOnHeaderItem[] = [];
  homeProjects: ProjectSummary[] = [];
  loadingHeader = false;
  loadingHome = false;
  errorMessage?: string;

  submitting = false;
  feedbackMessage = '';
  contactError = false;

  model = {
    name: '',
    phone: '',
    email: '',
    interestedIn: '',
    message: ''
  };

  slides: SlideInterface[] = [
    { url: 'assets/Images/top.png', title: 'image1', number: 1 },
    { url: 'assets/Images/top3-2.png', title: 'image2', number: 2 },
    { url: 'assets/Images/top3-3.png', title: 'image3', number: 3 },
  ];

  constructor(
    private projectService: ProjectService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadHeaderProjects();
    this.loadOurProjects();
  }

  loadOurProjects() {
    this.loadingHome = true;
    this.projectService.getProjectsDisplayedOnOurProject(1, 3).subscribe({
      next: res => {
        this.homeProjects = res.data.map(p => ({
          ...p,
          avatarUrl: p.avatarUrl.startsWith('http')
            ? p.avatarUrl
            : `https://localhost:7132/${p.avatarUrl}`
        }));
        this.loadingHome = false;
      },
      error: err => {
        console.error(err);
        this.loadingHome = false;
      }
    });
  }

  loadHeaderProjects() {
    this.loadingHeader = true;
    this.projectService.getProjectsDisplayedOnHeader(1, 3).subscribe({
      next: res => {
        this.headerProjects = res.data.sort(
          (a, b) => a.displayOrderOnHeader - b.displayOrderOnHeader
        );
        this.loadingHeader = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Không tải được header projects';
        this.loadingHeader = false;
      }
    });
  }

  viewProject(id: number) {
    // TODO: Điều hướng sang trang chi tiết dự án
  }

  sendContact(event: Event, f: any) {
    event.preventDefault();
    this.submitted = true;
    this.submitting = true;
    this.feedbackMessage = '';
    this.contactError = false;

    if (f.invalid) {
      this.feedbackMessage = 'Vui lòng điền đúng và đầy đủ thông tin.';
      this.contactError = true;
      this.submitting = false;
      return;
    }

    const payload: ContactCreateModel = {
      custommerName: this.model.name.trim(),
      customerPhoneNumber: this.model.phone.trim(),
      customerEmail: this.model.email.trim(),
      customerMessage: this.model.message.trim(),
      requestType: this.model.interestedIn.trim() || 'General',
      status: 'New',
      ipAddress: ''
    };

    this.contactService.createContactRequest(payload).subscribe({
      next: res => {
        this.submitting = false;
        if (res.result) {
          this.feedbackMessage = 'Gửi liên hệ thành công. Cảm ơn bạn!';
          this.contactError = false;
          this.model = { name: '', phone: '', email: '', interestedIn: '', message: '' };
        } else {
          this.contactError = true;
          this.feedbackMessage = res.message || 'Có lỗi xảy ra, thử lại sau.';
        }
      },
      error: err => {
        this.submitting = false;
        this.contactError = true;
        this.feedbackMessage =
          err?.error?.message ||
          err?.message ||
          'Không thể kết nối đến server hoặc có lỗi phía server.';
        console.error('Lỗi HTTP:', err);
      }
    });
  }
}

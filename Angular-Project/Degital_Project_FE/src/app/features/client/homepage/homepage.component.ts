import { Component, OnInit } from '@angular/core';
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
  headerProjects: ProjectDisplayedOnHeaderItem[] = []; // ✅ Chỉ giữ lại 1 lần
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

  constructor(
    private projectService: ProjectService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.loadHeaderProjects();
    this.loadOurProjects();
  }

  loadHeaderProjects() {
    this.loadingHeader = true;
    this.projectService.getProjectsDisplayedOnHeader().subscribe({
      next: res => {
        this.headerProjects = res.data.map(p => ({
          ...p,
          avatarUrl: p.avatarUrl.startsWith('http')
            ? p.avatarUrl
            : `https://localhost:7132/Uploads/${p.avatarUrl}`
        }));
        this.loadingHeader = false;
      },
      error: err => {
        console.error(err);
        this.loadingHeader = false;
      }
    });
  }

  loadOurProjects() {
    this.loadingHome = true;
    this.projectService.getProjectsDisplayedOnHomePage().subscribe({
      next: data => {
        this.homeProjects = data.map(p => ({
          ...p,
          avatarUrl: p.avatarUrl.startsWith('http')
            ? p.avatarUrl
            : `https://localhost:7132/Uploads/${p.avatarUrl}`
        }));
        this.loadingHome = false;
      },
      error: err => {
        console.error(err);
        this.loadingHome = false;
      }
    });
  }

  viewProject(id: number) {
    // TODO: Implement if needed
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

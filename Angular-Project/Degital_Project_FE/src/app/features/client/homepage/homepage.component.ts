import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectService } from '../../../core/services/project.service';
import { ContactService } from '../../../core/services/contact.service';

import {
  ProjectDisplayedOnHeaderItem,
  ProjectSummary,
} from '../../../core/models/project.models';
import { ContactCreateModel } from '../../../core/models/contact.models';

interface ContactFormModel {
  name: string;
  phone: string;
  email: string;
  interestedIn: string;
  message: string;
}

@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  // Form variables
  submitted = false;
  submitting = false;
  feedbackMessage = '';
  contactError = false;

  model: ContactFormModel = {
    name: '',
    phone: '',
    email: '',
    interestedIn: '',
    message: '',
  };

  // Projects
  headerProjects: ProjectDisplayedOnHeaderItem[] = [];
  homeProjects: ProjectSummary[] = [];
  loadingHeader = false;
  loadingHome = false;

  constructor(
    private projectService: ProjectService,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHeaderProjects();
    this.loadOurProjects();
  }

  // Load projects for image slider
  loadHeaderProjects() {
    this.loadingHeader = true;
    this.projectService.getProjectsDisplayedOnHeader().subscribe({
      next: (res) => {
        this.headerProjects = res.data.map((p) => ({
          ...p,
          avatarUrl: p.avatarUrl.startsWith('http')
            ? p.avatarUrl
            : `https://localhost:7132/Uploads/${p.avatarUrl}`,
        }));
        this.loadingHeader = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingHeader = false;
      },
    });
  }

  // Load projects for homepage section
  loadOurProjects() {
    this.loadingHome = true;
    this.projectService.getProjectsDisplayedOnHomePage().subscribe({
      next: (data) => {
        this.homeProjects = data.map((p) => ({
          ...p,
          avatarUrl: p.avatarUrl.startsWith('http')
            ? p.avatarUrl
            : `https://localhost:7132/Uploads/${p.avatarUrl}`,
        }));
        this.loadingHome = false;
      },
      error: (err) => {
        console.error(err);
        this.loadingHome = false;
      },
    });
  }

  // Go to project detail
  viewProject(id: number) {
    this.router.navigate(['/project-detail', id]);
  }

  // Send contact form
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
      ipAddress: '' // Optional
    };

    this.contactService.createContactRequest(payload).subscribe({
      next: (res) => {
        this.submitting = false;
        if (res.result) {
          this.feedbackMessage = 'Gửi liên hệ thành công. Cảm ơn bạn!';
          this.contactError = false;
          this.model = {
            name: '',
            phone: '',
            email: '',
            interestedIn: '',
            message: '',
          };
          this.submitted = false;
          f.resetForm();
        } else {
          this.contactError = true;
          this.feedbackMessage =
            res.message || 'Có lỗi xảy ra, vui lòng thử lại sau.';
        }
      },
      error: (err) => {
        this.submitting = false;
        this.contactError = true;
        this.feedbackMessage =
          err?.error?.message ||
          err?.message ||
          'Không thể kết nối đến máy chủ.';
        console.error('Lỗi gửi liên hệ:', err);
      },
    });
  }
}

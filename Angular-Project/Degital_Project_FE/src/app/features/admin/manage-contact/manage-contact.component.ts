import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../../core/models/contact.models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface PagedResult<T> {
  data: T[];
  totalCount: number;
}

@Component({
  selector: 'app-manage-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manage-contact.component.html',
  styleUrl: './manage-contact.component.scss',
})
export class ManageContactComponent implements OnInit {
  listContactModel: ContactModel[] = [];
  totalRecords = 0;
  totalPages = 0;

  subjectForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.subjectForm = this.fb.group({
      requestDate: [''],
      status: [''],
      key: [''],
      pageNumber: [1],
      pageSize: [10],
    });
  }

  ngOnInit(): void {
    this.getListContact();
  }

  private buildParamsFromForm() {
    const f = this.subjectForm.value;
    return {
      key: f.key || undefined,
      status: f.status || undefined,
      requestDate: f.requestDate || undefined,
      pageNumber: f.pageNumber ?? 1,
      pageSize: f.pageSize ?? 10,
    };
  }

  getListContact() {
    const { key, status, requestDate, pageNumber, pageSize } = this.buildParamsFromForm();

    this.loading = true;
    this.errorMessage = '';

    this.contactService
      .getListContact(key, status, requestDate, pageNumber, pageSize)
      .subscribe({
        next: (res: PagedResult<ContactModel>) => {
          this.listContactModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / pageSize);
          this.loading = false;
        },
        error: (err) => {
          console.error('Lấy danh sách contact thất bại', err);
          this.errorMessage = 'Không thể tải dữ liệu. Thử lại sau.';
          this.loading = false;
        },
      });
  }

  onDelete(id: number) {
    if (!confirm('Bạn có chắc muốn xóa?')) return;

    this.contactService.deleteContact(id).subscribe({
      next: () => {
        this.getListContact();
      },
      error: (err) => {
        console.error('Xóa thất bại', err);
        this.errorMessage = 'Xóa không thành công.';
      },
    });
  }

  onSubmit() {

    this.subjectForm.patchValue({ pageNumber: 1 });
    this.getListContact();
  }

  goToPage(page: number) {
    this.subjectForm.patchValue({ pageNumber: page });
    this.getListContact();
  }
}

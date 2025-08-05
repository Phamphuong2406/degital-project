import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ContactModel,
  ContactUpdateModel,
} from '../../../../core/models/contact.models';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  contactEditForm: FormGroup;
  submitted = false;
  prId: number = 0;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private contactSv: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactEditForm = this.fb.group({
      custommerName: ['', Validators.required],
      customerPhoneNumber: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerMessage: ['', Validators.required],
      requestType: ['', Validators.required],
      status: ['', Validators.required],
      ipAddress: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (!idParam) return;
      const id = +idParam;
      if (isNaN(id)) return;
      this.prId = id;
      this.loading = true;

      this.contactSv.getContactById(id).subscribe({
        next: (contact: ContactModel) => {
          this.loading = false;
          this.prId = contact.requestId;
          this.contactEditForm.patchValue({
            custommerName: contact.custommerName,
            customerPhoneNumber: contact.customerPhoneNumber,
            customerEmail: contact.customerEmail,
            customerMessage: contact.customerMessage,
            requestType: contact.requestType,
            status: contact.status,
            ipAddress: contact.ipAddress,
          });
        },
        error: (err) => {
          console.error('Lấy contact thất bại', err);
          this.loading = false;
          this.errorMessage = 'Không tải được dữ liệu liên hệ.';
        },
      });
    });
  }

  get f() {
    return this.contactEditForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactEditForm.invalid) {
      return;
    }
    if (!this.prId) {
      console.error('Request ID is missing!');
      return;
    }

    const payload: ContactUpdateModel = {
      custommerName: this.contactEditForm.value.custommerName,
      customerPhoneNumber: this.contactEditForm.value.customerPhoneNumber,
      customerEmail: this.contactEditForm.value.customerEmail,
      customerMessage: this.contactEditForm.value.customerMessage,
      requestType: this.contactEditForm.value.requestType,
      status: this.contactEditForm.value.status,
      ipAddress: this.contactEditForm.value.ipAddress,
    };

    this.contactSv.updateContactRequest(payload, this.prId).subscribe({
      next: (res) => {
        if (res.result) {
          alert(res.message || 'Cập nhật thành công');
          this.router.navigate(['admin/contact']);
        } else {
          this.errorMessage = res.message || 'Cập nhật không thành công.';
        }
      },
      error: (err) => {
        console.error('Cập nhật thất bại', err);
        this.errorMessage = 'Lỗi hệ thống khi cập nhật.';
      },
    });
  }
}

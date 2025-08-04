import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../../core/models/contact.models';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manage-contact.component.html',
  styleUrl: './manage-contact.component.scss',
})
export class ManageContactComponent implements OnInit {
  listContactModel: ContactModel[] = [];
  currentPage = 1;
  pageSize = 10;
  key = '';
  status = '';
  requestDate: string = '';
  totalRecords = 0;
  totalPages = 0;
  subjectForm: FormGroup;

  constructor(private contactService: ContactService, private fb: FormBuilder) {
    this.getListContact();
    this.subjectForm = this.fb.group({
      requestDate: '',
      status: '',
      key: '',
      pageNumber: 1,
      pageSize: 10,
    });
  }

  ngOnInit(): void {}

  getListContact() {
    this.contactService
      .getListContact(
        this.key,
        this.status,
        this.requestDate,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.listContactModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        },
        error: (err) => {},
      });
  }

  onDelete(id: number) {
    this.contactService.deleteContact(id).subscribe((res) => {
      this.getListContact();
    });
    alert('click on button ' + id);
  }
  onSubmit() {
    const form = this.subjectForm.value;
    this.contactService
      .getListContact(
        form.key,
        form.status,
        form.requestDate,
        form.pageNumber,
        form.pageSize
      )
      .subscribe({
        next: (res: any) => {
          this.listContactModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / form.pageSize);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}

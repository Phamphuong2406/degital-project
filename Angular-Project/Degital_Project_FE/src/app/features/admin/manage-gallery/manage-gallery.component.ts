import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GalleryModel } from '../../../core/models/gallery.models';
import { GalleryService } from '../../../core/services/gallery.service';

@Component({
  selector: 'app-manage-gallery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manage-gallery.component.html',
  styleUrl: './manage-gallery.component.scss',
})
export class ManageGalleryComponent implements OnInit {
  listGalleryModel: GalleryModel[] = [];
  currentPage = 1;
  pageSize = 10;

  address = '';
  postingStartDate: string = '';
  postingEndDate: string = '';
  totalRecords = 0;
  totalPages = 0;
  subjectForm: FormGroup;

  constructor(private galleryService: GalleryService, private fb: FormBuilder) {
    this.getListProject();
    this.subjectForm = this.fb.group({
      postingStartDate: '',
      postingEndDate: '',
      address: '',
      pageNumber: 1,
      pageSize: 10,
    });
  }

  ngOnInit(): void {}

  getListProject() {
    this.galleryService
      .getListGallery(
        this.address,
        this.postingStartDate,
        this.postingEndDate,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.listGalleryModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        },
        error: (err) => {},
      });
  }

  onDelete(id: number) {
    this.galleryService.deleteGallery(id).subscribe((res) => {
      this.getListProject();
    });
    alert('click on button ' + id);
  }
  onSubmit() {
    const form = this.subjectForm.value;
    this.galleryService
      .getListGallery(
        form.address,
        form.postingStartDate,
        form.postingEndDate,
        form.pageNumber,
        form.pageSize
      )
      .subscribe({
        next: (res: any) => {
          this.listGalleryModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / form.pageSize);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}

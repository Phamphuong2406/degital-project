import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  noData: boolean = false;

  currentPage = 1;
  pageSize = 6;
  totalRecords = 0;
  totalPages = 0;

  subjectForm: FormGroup;

  constructor(private galleryService: GalleryService, private fb: FormBuilder) {
    this.subjectForm = this.fb.group({
      postingStartDate: '',
      postingEndDate: '',
      address: '',
    });
  }

  ngOnInit(): void {
    this.loadGalleries();
  }

  loadGalleries(): void {
    const form = this.subjectForm.value;

    this.galleryService
      .getListGallery(
        form.address,
        form.postingStartDate,
        form.postingEndDate,
        this.currentPage,
        this.pageSize
      )
      .subscribe({
        next: (res: any) => {
          this.listGalleryModel = res.data;
          this.totalRecords = res.totalRecords;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
          this.noData = res.data.length === 0;
        },
        error: (err) => {
          console.error(err);
          this.noData = true;
        },
      });
  }

  onDelete(id: number): void {
    this.galleryService.deleteGallery(id).subscribe(() => {
      this.loadGalleries();
    });
    alert('click on button ' + id);
  }

  onSubmit(): void {
    this.currentPage = 1; // Reset về trang đầu tiên khi lọc
    this.loadGalleries();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadGalleries();
    }
  }
}

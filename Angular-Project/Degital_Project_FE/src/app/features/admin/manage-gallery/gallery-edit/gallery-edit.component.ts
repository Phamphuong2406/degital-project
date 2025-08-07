import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GalleryService } from '../../../../core/services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-edit.component.html',
  styleUrl: './gallery-edit.component.scss',
})
export class GalleryEditComponent implements OnInit {
  galleryEditForm: FormGroup;
  submited: boolean = false;
  srcResult: any = null;
  prId: number = 0;
  imageurl = 'assets/Images/empty.png';
  imageOldName = '';
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private gallerySv: GalleryService,
    private router: Router,
    private _router: ActivatedRoute
  ) {
    this.galleryEditForm = this.fb.group({
      galleryName: ['', Validators.required],
      address: ['', Validators.required],
      image: [null],
      imageOld: [''],
    });
  }

  ngOnInit(): void {
    this._router.paramMap.subscribe((query) => {
      const idParam = query.get('id');
      if (idParam !== null) {
        const id = +idParam;
        this.prId = id;

        this.gallerySv.getGalleryId(id).subscribe((res) => {
          this.prId = res.galleryId;
          this.imageOldName = res.imageUrl || '';
          this.imageurl = res.imageUrl
            ? 'https://localhost:7132/Uploads/' + res.imageUrl
            : 'assets/Images/empty.png';
          // Cập nhật dữ liệu vào form
          this.galleryEditForm.patchValue({
            galleryName: res.galleryName,
            address: res.address,
            imageOld: res.imageUrl,
          });

          // Nếu có ảnh preview
          if (res.imageUrl) {
            this.srcResult = res.imageUrl;
          }
        });
      }
    });
  }

  get f() {
    return this.galleryEditForm.controls;
  }

  onSubmit(): void {
    this.submited = true;

    if (this.galleryEditForm.invalid) {
      console.log(this.galleryEditForm.value);
      return;
    }

    if (!this.prId) {
      console.error('Gallery ID is missing!');
      return;
    }

    const formData = new FormData();
    formData.append(
      'galleryName',
      this.galleryEditForm.get('galleryName')?.value
    );
    formData.append('address', this.galleryEditForm.get('address')?.value);

    // avatar xử lý riêng
    if (this.imageFile) {
      console.log('Image File:', this.imageFile);

      formData.append('image', this.imageFile); // Gửi file mới
    } else {
      formData.append('image', ''); // Gửi avatar là rỗng
    }

    // avatarOld luôn gửi
    formData.append(
      'imageOld',
      this.galleryEditForm.get('imageOld')?.value || ''
    );
    console.log(formData);
    this.gallerySv.updateGallery(formData, this.prId).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['admin/gallery']);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.imageurl = e.target.result;
        this.srcResult = e.target.result;
      };
    }
  }
}

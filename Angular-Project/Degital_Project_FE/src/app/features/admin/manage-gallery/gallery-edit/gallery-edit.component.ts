import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryService } from '../../../../core/services/gallery.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gallery-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-edit.component.html',
  styleUrl: './gallery-edit.component.scss'
})
export class GalleryEditComponent {
  galleryEditForm: FormGroup;
  submited: boolean = false;
  srcResult: any = null;
  prId: number = 0;

  constructor(
    private fb: FormBuilder,
    private gallerySv: GalleryService,
    private router: Router,
    private _router: ActivatedRoute
  ) {
    this.galleryEditForm = this.fb.group({
      galleryName: ['', Validators.required],
      address: ['', Validators.required],
      image: [null, Validators.required],
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

          // Cập nhật dữ liệu vào form
          this.galleryEditForm.patchValue({
            galleryName: res.galleryName,
            address: res.address
            // Không patch ảnh vì ảnh là file
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
    formData.append('galleryName', this.galleryEditForm.get('galleryName')?.value);
    formData.append('address', this.galleryEditForm.get('address')?.value);
    formData.append('image', this.galleryEditForm.get('image')?.value);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    this.gallerySv.updateGallery(formData, this.prId).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['admin/gallery']);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.galleryEditForm.patchValue({ image: file }); // sửa từ avatar → image
      this.galleryEditForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.srcResult = reader.result;
      };
    }
  }
}

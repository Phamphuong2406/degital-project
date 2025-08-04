import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GalleryService } from '../../../../core/services/gallery.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-add.component.html',
  styleUrl: './gallery-add.component.scss',
})
export class GalleryAddComponent {
  projectAddForm: FormGroup;
  submited: boolean = false;
  srcResult: any = null;

  constructor(
    private fb: FormBuilder,
    private gallerySv: GalleryService,
    private router: Router
  ) {
    this.projectAddForm = this.fb.group({
      image: ['', Validators.required],
      galleryName: ['', Validators.required],
      address: [null, Validators.required],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.projectAddForm.controls;
  }

  onSubmit(): any {
    this.submited = true;
    if (this.projectAddForm.invalid) {
      console.log(this.projectAddForm.value);
      return;
    }

    const formData = new FormData();
    formData.append('image', this.projectAddForm.get('image')?.value);
    formData.append(
      'galleryName',
      this.projectAddForm.get('galleryName')?.value
    );
    formData.append('address', this.projectAddForm.get('address')?.value);

    this.gallerySv.createNewGallery(formData).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['admin/gallery']);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.projectAddForm.patchValue({ image: file });
      this.projectAddForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.srcResult = reader.result;
      };
    }
  }
}

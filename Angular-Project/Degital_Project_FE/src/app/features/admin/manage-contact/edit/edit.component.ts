import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  contactEditForm: FormGroup;
  submited: boolean = false;
  srcResult: any = null;
  prId: number = 0;

  constructor(
    private fb: FormBuilder,
    private contatctSv: ContactService,
    private router: Router,
    private _router: ActivatedRoute
  ) {
    this.contactEditForm = this.fb.group({

      custommerName: ['', Validators.required],
      customerPhoneNumber: ['', Validators.required],
      customerEmail: ['', Validators.required],
      customerMessage: ['', Validators.required],
      requestType: ['', Validators.required],

    });
  }

  ngOnInit(): void {
    this._router.paramMap.subscribe((query) => {
      const idParam = query.get('id');

      if (idParam !== null) {
        const id = +idParam; // ép kiểu sang number
        this.prId = id;

        this.contatctSv.getContactById(id).subscribe((res) => {
          const contact = res;
          this.prId = contact.requestId;

          this.contactEditForm = this.fb.group({

            custommerName: ['', Validators.required],
            customerPhoneNumber: ['', Validators.required],
            customerEmail: ['', Validators.required],
            customerMessage: ['', Validators.required],
            requestType: ['', Validators.required],
          });
        });
      }
    });
  }

  get f() {
    return this.contactEditForm.controls;
  }

  onSubmit(): any {
    this.submited = true;

    if (this.contactEditForm.invalid) {
      console.log(this.contactEditForm.value);
      return false;
    }

    if (!this.prId) {
      console.error('Request ID is missing!');
      return;
    }

    const formData = new FormData();

    Object.keys(this.contactEditForm.controls).forEach((key) => {
      const control = this.contactEditForm.get(key);
      if (!control) return;

      let value = control.value;

      if (typeof value === 'boolean') {
        value = value ? 'true' : 'false';
      }

      if (key.includes('Time') && value) {
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
          value = date.toISOString();
        }
      }

      formData.append(key, value);
    });

    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    this.contatctSv.updateContact(formData, this.prId).subscribe((res) => {
      alert(res.message);
      this.router.navigate(['project']);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.contactEditForm.patchValue({ avatar: file });
      this.contactEditForm.get('avatar')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.srcResult = reader.result;
      };
    }
  }
}

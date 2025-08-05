import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingService } from '../../../../core/services/setting.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setting-add.component.html',
  styleUrl: './setting-add.component.scss',
})
export class SettingAddComponent {
  settingAddForm: FormGroup;
  submited: boolean = false;

  constructor(
    private fb: FormBuilder,
    private settingSv: SettingService,
    private router: Router
  ) {
    this.settingAddForm = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      settingType: ['', Validators.required],
      discription: [''],
      displayOnHome: [false],
      displayOrderOnHome: [0],
    });
  }

  get f() {
    return this.settingAddForm.controls;
  }

  onSubmit(): void {
    this.submited = true;
    if (this.settingAddForm.invalid) {
      console.log(this.settingAddForm.value);
      return;
    }

    const request = this.settingAddForm.value;

    this.settingSv.createNewSetting(request).subscribe({
      next: (res) => {
        alert(res.message);
        this.router.navigate(['admin/setting']);
      },
      error: (err) => {
        console.error('Error creating setting:', err);
        alert('Đã xảy ra lỗi khi thêm cài đặt.');
      },
    });
  }
}

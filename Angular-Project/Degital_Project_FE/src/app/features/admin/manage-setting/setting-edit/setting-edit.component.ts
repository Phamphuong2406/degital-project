import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SettingService } from '../../../../core/services/setting.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SettingCreateOrUpdateModel,
  SettingModel,
} from '../../../../core/models/setting.model';

@Component({
  selector: 'app-setting-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './setting-edit.component.html',
  styleUrl: './setting-edit.component.scss',
})
export class SettingEditComponent {
  settingEditForm: FormGroup;
  submitted = false;
  prId: number = 0;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private settingSv: SettingService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.settingEditForm = this.fb.group({
      key: ['', Validators.required],
      value: ['', Validators.required],
      settingType: ['', Validators.required],
      discription: [''],
      displayOnHome: [false],
      displayOrderOnHome: [0],
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

      this.settingSv.getSettingById(id).subscribe({
        next: (setting: SettingModel) => {
          this.loading = false;
          this.prId = setting.id;
          this.settingEditForm.patchValue({
            key: setting.key,
            value: setting.value,
            settingType: setting.settingType,
            discription: setting.discription,
            displayOnHome: setting.displayOnHome,
            displayOrderOnHome: setting.displayOrderOnHome,
          });
        },
        error: (err) => {
          console.error('Lấy setting thất bại', err);
          this.loading = false;
          this.errorMessage = 'Không tải được dữ liệu liên hệ.';
        },
      });
    });
  }

  get f() {
    return this.settingEditForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.settingEditForm.invalid) {
      return;
    }
    if (!this.prId) {
      console.error('Request ID is missing!');
      return;
    }

    const payload: SettingCreateOrUpdateModel = {
      key: this.settingEditForm.value.key,
      value: this.settingEditForm.value.value,
      settingType: this.settingEditForm.value.settingType,
      discription: this.settingEditForm.value.discription,
      displayOnHome: this.settingEditForm.value.displayOnHome,
      displayOrderOnHome: this.settingEditForm.value.displayOrderOnHome,
    };

    this.settingSv.updateSetting(payload, this.prId).subscribe({
      next: (res) => {
        if (res.result) {
          alert(res.message || 'Cập nhật thành công');
          this.router.navigate(['admin/setting']);
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

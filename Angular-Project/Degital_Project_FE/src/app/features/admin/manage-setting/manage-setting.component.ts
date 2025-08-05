import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../core/services/setting.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SettingModel } from '../../../core/models/setting.model';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-setting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manage-setting.component.html',
  styleUrl: './manage-setting.component.scss',
})
export class ManageSettingComponent implements OnInit {
  listSettingModel: SettingModel[] = [];
  currentPage = 1;
  pageSize = 10;

  key = '';
  totalRecords = 0;
  totalPages = 0;
  subjectForm: FormGroup;

  constructor(private settingService: SettingService, private fb: FormBuilder) {
    this.getListSetting();
    this.subjectForm = this.fb.group({
      key: '',
      pageNumber: 1,
      pageSize: 10,
    });
  }

  ngOnInit(): void {}

  getListSetting() {
    this.settingService
      .getListSetting(this.key, this.currentPage, this.pageSize)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.listSettingModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        },
        error: (err) => {},
      });
  }

  onDelete(id: number) {
    this.settingService.deleteSetting(id).subscribe((res) => {
      this.getListSetting();
    });
    alert('click on button ' + id);
  }
  onSubmit() {
    const form = this.subjectForm.value;
    this.settingService
      .getListSetting(form.key, form.pageNumber, form.pageSize)
      .subscribe({
        next: (res: any) => {
          this.listSettingModel = res.data;
          this.totalRecords = res.totalCount;
          this.totalPages = Math.ceil(this.totalRecords / form.pageSize);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}

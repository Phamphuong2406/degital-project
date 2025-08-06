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
  noData: boolean = false;

  currentPage = 1;
  pageSize = 3;

  key = '';
  totalRecords = 0;
  totalPages = 0;

  subjectForm: FormGroup;

  constructor(private settingService: SettingService, private fb: FormBuilder) {
    this.subjectForm = this.fb.group({
      key: '',
    });
  }

  ngOnInit(): void {
    this.loadSetting();
  }

  loadSetting(): void {
    const form = this.subjectForm.value;
    this.settingService
      .getListSetting(form.key, this.currentPage, this.pageSize)
      .subscribe({
        next: (res: any) => {
          this.listSettingModel = res.data;
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

  onDelete(id: number) {
    this.settingService.deleteSetting(id).subscribe(() => {
      this.loadSetting(); // sau khi xóa, load lại danh sách hiện tại
    });
  }

  onSubmit() {
    this.currentPage = 1; // Reset về trang 1 khi tìm kiếm mới
    this.loadSetting();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadSetting();
    }
  }
}

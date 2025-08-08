import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../core/services/setting.service';
import { Setting } from '../../../core/models/setting.model';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  footerSettings: Setting[] = [];

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getListDisplayedOnFooter().subscribe({
      next: (data) => {
        this.footerSettings = data;
      },
      error: (err) => console.error('Lỗi khi lấy dữ liệu footer:', err)
    });
  }
}

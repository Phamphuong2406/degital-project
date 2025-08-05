import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../../core/services/project.service';
import { SettingService } from '../../../../core/services/setting.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  address: string | null = null;
  phone: string | null = null;
  email: string | null = null;

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    // Giả sử key trong backend là "address", "phone", "email"
    this.settingService.getSettingValue('adress').subscribe(v => this.address = v); // lưu ý typo "adress" nếu đúng API
    this.settingService.getSettingValue('phone').subscribe(v => this.phone = v);
    this.settingService.getSettingValue('email').subscribe(v => this.email = v);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SettingService } from '../../../core/services/setting.service';
import { HttpClient } from '@angular/common/http';
import { ContactModel } from '../../../core/models/contact.models';
import { Setting } from '../../../core/models/setting.model';
@Component({
  selector: 'app-contactinformation',
  standalone: false,
  templateUrl: './contactinformation.component.html',
  styleUrl: './contactinformation.component.scss'
})
export class ContactinformationComponent implements OnInit {

  ContactInforSettings: Setting[] = [];

   constructor(private settingService: SettingService) { }

   ngOnInit(): void {
     this.settingService.getListDisplayedOnContactInfor().subscribe({
       next: (data) => {
         this.ContactInforSettings = data;
       },
       error: (err) => console.error('Lỗi khi lấy dữ liệu :', err)
     });
   }
}

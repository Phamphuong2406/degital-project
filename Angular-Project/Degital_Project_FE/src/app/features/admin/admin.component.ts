import { Component, OnInit } from '@angular/core';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'admin',
  standalone: true,
  imports: [SidebarAdminComponent, NavbarComponent, RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}

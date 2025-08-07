import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss',
})
export class SidebarAdminComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}
  goToHome() {
    this.router.navigate(['homepage']);
  }

  logout() {
    this.auth.logout();
  }
}

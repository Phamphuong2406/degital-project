import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  activeTab: string = 'main';

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url === '/' || url.startsWith('/home')) {
          this.activeTab = 'main';
        } else if (url.startsWith('/gallery')) {
          this.activeTab = 'gallery';
        } else if (url.startsWith('/ourproject')) {
          this.activeTab = 'ourproject';
        } else if (url.startsWith('/company')) {
          this.activeTab = 'company';
        } else if (url.startsWith('/contact')) {
          this.activeTab = 'contact';
        }
      }
    });
  }
}

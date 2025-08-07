import { Component,OnInit} from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-companycertifications',
  standalone: false,
  templateUrl: './companycertifications.component.html',
  styleUrl: './companycertifications.component.scss'
})
export class CompanycertificationsComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

  }
  goToHome() {
    this.router.navigate(['homepage']);
  }

  logout() {
    this.auth.logout();
  }
}

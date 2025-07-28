import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ourproject',
  standalone: false,
  templateUrl: './ourproject.component.html',
  styleUrl: './ourproject.component.scss'
})
export class OurprojectComponent implements OnInit {
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
{

}

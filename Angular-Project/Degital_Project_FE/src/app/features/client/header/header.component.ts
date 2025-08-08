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
  constructor(private router: Router, private auth: AuthService) { }
statusClass = 'hr-t';
hrLeft: number = 30;
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        if (url === '/' || url.startsWith('/home')) {
          this.hrLeft = 30;
        } else if (url.startsWith('/gallery')) {
          this.hrLeft = 100;
        } else if (url.startsWith('/ourproject')) {
          this.hrLeft = 200;
        } else if (url.startsWith('/company')) {
          this.hrLeft = 300;
        } else if (url.startsWith('/contact')) {
          this.hrLeft = 400;
        }
      }
    });
  }

  goToHome() {
    this.router.navigate(['homepage']);
  }

  logout() {
    this.auth.logout();
  }

  // statusClass = 'hr-t';

  // setActiveClass() {
  //   this.statusClass = 'hr-t-change1';
  // }
  // setActiveClass2() {
  //   this.statusClass = 'hr-t-change2';
  // }
  // setActiveClass3() {
  //   this.statusClass = 'hr-t-change3';
  // }
  //  setActiveClass4() {
  //   this.statusClass = 'hr-t-change4';
  // }




  // bntStyle1: string | undefined;
  //   AppComponent() {

  //    this. bntStyle1 = 'hr-t';
  //   }
  //   submit() {
  //     this.bntStyle1 = 'hr-t-change1';

  //   }

}


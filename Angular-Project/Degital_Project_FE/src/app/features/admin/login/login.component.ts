import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginObj: any = {
    "email": "",
    "password": ""

  };
  http = inject(HttpClient);
  router = inject(Router);
  login() {
    this.http.post("https://localhost:7132/api/Account/AccountLogin", this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login sucess");
        localStorage.setItem('tokenfromBE', res.token);
        this.router.navigate(['admin/project'])
      } else {
        alert(res.message)
      }
    })

  }
}
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { loginDataRequired } from '../../../core/models/logIn.models';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: loginDataRequired = {
    email: '',
    password: '',
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logIn() {
    this.auth.logIn(this.loginForm).subscribe({
      next: (res) => {
        if (res.result) {
          alert(res.responseMessage);
          localStorage.setItem('token', res.token);
          this.router.navigate(['project']);
        } else {
          alert('Đăng nhập thất bại');
        }
      },
      error: (err) => {
        console.error('Login error', err);
        alert('Có lỗi xảy ra khi đăng nhập');
      },
    });
  }
}

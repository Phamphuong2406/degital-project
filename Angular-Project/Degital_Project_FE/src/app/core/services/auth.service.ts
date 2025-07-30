import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loginDataRequired, returnedLoginData } from '../models/logIn.models';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }
  logIn(data:loginDataRequired): Observable<returnedLoginData> {
   return this.http.post<returnedLoginData>("https://localhost:7132/api/Account/AccountLogin",data);

  }

   logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}

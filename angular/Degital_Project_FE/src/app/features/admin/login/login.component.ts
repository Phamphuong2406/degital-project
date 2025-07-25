import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { routes } from '../../../app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
username = "";
password = "";
errorMsg ="";
constructor(private auth: AuthService, private router: Router){

}
ngOnInit(): void {

}

login(){
  if (this.username.trim().length === 0)
  {
    this.errorMsg = "Username is required";
  }else if (this.password.trim().length === 0)
  {
    this.errorMsg = "Password is required";
  }
  else{
    this.errorMsg = "";
    let res = this.auth.login(this.username, this.password);
    if (res === 200)
    {
      this.router.navigate(['home'])
    }
    if (res === 403)
    {
      this.errorMsg = "Invalid Credential";
    }
  }
}
}

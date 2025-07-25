import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [

  {path: 'login',component: LoginComponent },
  // {path: 'dashboard',component: DashboardComponent },

  // {path: 'login',component: LoginComponent},
  // {path: 'company',component: CompanycertificationsComponent},
  // {path: 'ourproject',component: OurprojectComponent},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'contact', component: ContactinformationComponent},
  // {path: '**', component: HomepageComponent }
];

 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule{

  }

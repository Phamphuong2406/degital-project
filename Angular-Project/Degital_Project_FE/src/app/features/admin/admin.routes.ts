import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from '../client/homepage/homepage.component';
import { ManageProjectComponent } from './dashboard/manage-project/manage-project.component';
import { ManageGalleryComponent } from './dashboard/manage-gallery/manage-gallery.component';
import { ManageUserComponent } from './dashboard/manage-user/manage-user.component';
import { ManageContactComponent } from './dashboard/manage-contact/manage-contact.component';
import { ManageSettingComponent } from './dashboard/manage-setting/manage-setting.component';

export const routes: Routes = [

  {path: 'login',component: LoginComponent },
  {path: 'dashboard',component: DashboardComponent },
    {path: 'homepage',component: HomepageComponent },

  // {path: 'login',component: LoginComponent},
  // {path: 'company',component: CompanycertificationsComponent},
   {path: 'admin/project',component: ManageProjectComponent},
   {path: 'admin/gallery', component:ManageGalleryComponent},
   {path: 'admin/user',component:ManageUserComponent},
   {path: 'admin/setting', component:ManageSettingComponent},
  // {path: 'dashboard', component: DashboardComponent},
   {path: 'admin/contact', component: ManageContactComponent},
  // {path: '**', component: HomepageComponent }
];

 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule{

  }

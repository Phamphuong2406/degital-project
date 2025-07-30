import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from '../client/homepage/homepage.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ManageGalleryComponent } from './manage-gallery/manage-gallery.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ManageSettingComponent } from './manage-setting/manage-setting.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';

export const routes: Routes = [

  {path: 'login',component: LoginComponent },
    {path: 'homepage',component: HomepageComponent },

   {path: 'login',component: LoginComponent},
  // {path: 'company',component: CompanycertificationsComponent},
   {path: 'admin/project',component: ManageProjectComponent},
   {path: 'admin/gallery', component:ManageGalleryComponent},
   {path: 'admin/user',component:ManageUserComponent},
   {path: 'admin/setting', component:ManageSettingComponent},
   {path: 'admin/dashboard', component: SidebarAdminComponent},
   {path: 'admin/contact', component: ManageContactComponent},
  // {path: '**', component: HomepageComponent }
];

 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AdminRoutingModule{

  }

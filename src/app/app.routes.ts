import { RouterModule, Routes } from '@angular/router';import { LoginComponent } from './features/admin/login/login.component';

import { CompanycertificationsComponent } from './features/client/companycertifications/companycertifications.component';
import { OurprojectComponent } from './features/client/ourproject/ourproject.component';
import { ContactinformationComponent } from './features/client/contactinformation/contactinformation.component';
import { NgModule } from '@angular/core';

import { HomepageComponent } from './features/client/homepage/homepage.component';
export const routes: Routes = [

{path: '', loadChildren: ()=> import('./features/features.module').then((x)=> x.FeaturesModule) },

// {path: 'login', loadChildren: ()=> import('./features/admin/admin.module').then((x)=> x.AdminModule) },

// {path: 'gallery', loadChildren: ()=> import('./features/client/client.module').then((x)=> x.ClientModule) },

];

 @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule{
  }
//   {
//     path: 'admin',
// // tro vao model admin trong day thi rooting cho cac page
//   }


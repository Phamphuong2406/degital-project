import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { HomepageComponent } from '../client/homepage/homepage.component';
import { OurprojectComponent } from './ourproject/ourproject.component';
import { CompanycertificationsComponent } from './companycertifications/companycertifications.component';
import { ContactinformationComponent } from './contactinformation/contactinformation.component';
import { GalleryComponent } from './gallery/gallery.component';

export const routes: Routes = [

  {path: '',component: HomepageComponent },
  {path: 'gallery',component: GalleryComponent},
  {path: 'ourproject',component: OurprojectComponent },
  {path: 'company',component: CompanycertificationsComponent},
  {path: 'contact', component: ContactinformationComponent},
];

 @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ClientRoutingModule{

  }

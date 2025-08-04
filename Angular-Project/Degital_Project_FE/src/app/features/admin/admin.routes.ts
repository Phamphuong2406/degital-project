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
import { GalleryAddComponent } from './manage-gallery/gallery-add/gallery-add.component';
import { GalleryEditComponent } from './manage-gallery/gallery-edit/gallery-edit.component';
import { ProjectAddComponent } from './manage-project/project-add/project-add.component';
import { ProjectEditComponent } from './manage-project/project-edit/project-edit.component';
import { AdminComponent } from './admin.component';
import { EditComponent } from './manage-contact/edit/edit.component';
import { AddComponent } from './manage-contact/add/add.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'project',
        children: [
          { path: '', component: ManageProjectComponent },
          { path: 'add', component: ProjectAddComponent },
          { path: 'edit/:id', component: ProjectEditComponent },
        ],
      },
      {
        path: 'gallery',
        children: [
          { path: '', component: ManageGalleryComponent },
          { path: 'add', component: GalleryAddComponent },
          { path: 'edit/:id', component: GalleryEditComponent },
        ],
      },
      { path: 'user', component: ManageUserComponent },
      { path: 'setting', component: ManageSettingComponent },
      { path: 'dashboard', component: SidebarAdminComponent },
      {
        path: 'contact',
        children: [
          { path: '', component: ManageContactComponent },
          { path: 'add', component: AddComponent },
          { path: 'edit/:id', component: EditComponent },
        ],
      },
    ],
  },
  // {path: 'company',component: CompanycertificationsComponent},
  // {path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }

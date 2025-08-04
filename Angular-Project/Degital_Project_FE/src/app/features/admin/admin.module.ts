import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from '../features.routes';
import { LoginComponent } from './login/login.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { ProjectAddComponent } from './project-add/project-add.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { RouterLink } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent, ProjectAddComponent, ManageProjectComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    FormsModule,
    ManageContactComponent,
    RouterLink,
  ],
})
export class AdminModule {}

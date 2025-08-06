import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from '../features.routes';
import { LoginComponent } from './login/login.component';
import { ManageContactComponent } from './manage-contact/manage-contact.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    FormsModule,
    ManageContactComponent,
    CKEditorModule,
  ],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from '../features.routes';
import { LoginComponent } from './login/login.component';
import { ManageContactComponent } from "./manage-contact/manage-contact.component";

@NgModule({
  declarations: [
      LoginComponent,

    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    FormsModule,
    ManageContactComponent
]
})
export class AdminModule { }

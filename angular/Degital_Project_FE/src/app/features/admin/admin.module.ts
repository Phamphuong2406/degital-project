import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from '../client/homepage/homepage.component';
import { HeaderComponent } from '../client/homepage/header/header.component';
import { FooterComponent } from '../client/homepage/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesRoutingModule } from '../features.routes';
import { LoginComponent } from './login/login.component';
import { ManageContactComponent } from "./dashboard/manage-contact/manage-contact.component";

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

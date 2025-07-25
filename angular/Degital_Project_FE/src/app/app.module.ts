import { CompanycertificationsComponent } from './features/client/companycertifications/companycertifications.component';
import { OurprojectComponent } from './features/client/ourproject/ourproject.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactinformationComponent } from './features/client/contactinformation/contactinformation.component';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FeaturesModule } from './features/features.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // RouterOutlet,
    FeaturesModule
],
 declarations: [
    // AppComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule{}

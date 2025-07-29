import { CompanycertificationsComponent } from './features/client/companycertifications/companycertifications.component';
import { OurprojectComponent } from './features/client/ourproject/ourproject.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactinformationComponent } from './features/client/contactinformation/contactinformation.component';
import { NgModule } from '@angular/core';
import { FeaturesModule } from './features/features.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { App } from './app';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { customInterceptor } from './interceptor/custom.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FeaturesModule
],
 declarations: [],
  providers: [{provide: HTTP_INTERCEPTORS, useFactory: customInterceptor, multi: true}],
  bootstrap: []
})
export class AppModule{}

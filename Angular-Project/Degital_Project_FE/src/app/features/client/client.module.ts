import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from '../features.routes';
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    FormsModule,
  ],
})
export class ClientModule {}

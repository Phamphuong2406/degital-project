import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomepageComponent } from './client/homepage/homepage.component';
import { ContactinformationComponent } from './client/contactinformation/contactinformation.component';
import { OurprojectComponent } from './client/ourproject/ourproject.component';
import { CompanycertificationsComponent } from './client/companycertifications/companycertifications.component';
import { GalleryComponent } from './client/gallery/gallery.component';

import { FeaturesRoutingModule } from './features.routes';
import { AdminRoutingModule } from './admin/admin.routes';
import { ClientModule } from './client/client.module';
import { ClientRoutingModule } from './client/client.routes';

import { ImageSliderComponent } from '../imageSlider/components/imageSlider/imageSlider.component';
import { ImageSliderGalleryComponent } from '../imageSliderGallery/components/imageSliderGallery/imageSliderGallery.component';

import { SharedModule } from '../shared/shared.module'; // ✅ Import SharedModule

@NgModule({
  declarations: [
    HomepageComponent,
    ContactinformationComponent,
    GalleryComponent,
    CompanycertificationsComponent,
    ImageSliderComponent,
    ImageSliderGalleryComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    ClientRoutingModule,
    FeaturesRoutingModule,
    ClientModule,
    SharedModule // ✅ Đã import SharedModule
  ]
})
export class FeaturesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './client/homepage/homepage.component';
import { HeaderComponent } from './client/homepage/header/header.component';
import { FooterComponent } from './client/homepage/footer/footer.component';
import { FeaturesRoutingModule } from './features.routes';
import { ContactinformationComponent } from './client/contactinformation/contactinformation.component';
import { OurprojectComponent } from './client/ourproject/ourproject.component';
import { CompanycertificationsComponent } from './client/companycertifications/companycertifications.component';
import { AdminRoutingModule } from './admin/admin.routes';
import { GalleryComponent } from './client/gallery/gallery.component';
import { ClientModule } from './client/client.module';
import { ClientRoutingModule } from './client/client.routes';
import { ImageSliderComponent } from '../imageSlider/components/imageSlider/imageSlider.component';
import { ImageSliderGalleryComponent } from '../imageSliderGallery/components/imageSliderGallery/imageSliderGallery.component';
import { AppModule } from '../app.module';
import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    ContactinformationComponent,
    GalleryComponent,
    OurprojectComponent,
    CompanycertificationsComponent,
    ImageSliderComponent,
    ImageSliderGalleryComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ClientRoutingModule,
    FeaturesRoutingModule,
    FormsModule,
    ClientModule,
    BrowserModule,
    AdminModule,
  ],
})
export class FeaturesModule {}

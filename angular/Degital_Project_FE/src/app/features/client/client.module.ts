import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from '../client/homepage/homepage.component';
import { HeaderComponent } from '../client/homepage/header/header.component';
import { FooterComponent } from '../client/homepage/footer/footer.component';
import { FeaturesRoutingModule } from '../features.routes';
import { OurprojectComponent } from '../client/ourproject/ourproject.component';
import { CompanycertificationsComponent } from './companycertifications/companycertifications.component';
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
   OurprojectComponent,
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    FormsModule,
]
})
export class ClientModule {



}

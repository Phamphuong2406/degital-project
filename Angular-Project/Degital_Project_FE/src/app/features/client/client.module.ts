import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from '../features.routes';
import { ProjectDetailComponent } from './ourproject/project-detail/project-detail.component';
import { OurprojectComponent } from './ourproject/ourproject.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    OurprojectComponent,
    ProjectDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FeaturesRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class ClientModule {}

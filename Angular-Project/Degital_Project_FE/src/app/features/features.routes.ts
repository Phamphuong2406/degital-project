import { NgModule } from '@angular/core';
import { Routes, Route, RouterModule } from '@angular/router';
import { HomepageComponent } from './client/homepage/homepage.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminModule } from './admin/admin.module';
import { OurprojectComponent } from './client/ourproject/ourproject.component';
import { CompanycertificationsComponent } from './client/companycertifications/companycertifications.component';
import { GalleryComponent } from './client/gallery/gallery.component';
/* The `const routes: Routes` array in the TypeScript code snippet is defining the routing
configuration for a web application using Angular. Each object within the array represents a route
configuration with properties like `path` (the URL path), `component` (the component to render when
the path is matched), and `redirectTo` (redirect path if the route is empty). */
export const routes: Routes = [
  // {path: '',component: HomepageComponent },
  // {path: 'ourproject',component: OurprojectComponent },
  {
    path: '',
    loadChildren: () =>
      import('./client/client.module').then((x) => x.ClientModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((x) => x.AdminModule),
  },
  // {path: 'gallery', loadChildren: ()=> import('./client/client.module').then((x)=> x.ClientModule) },
  // {path: 'login',component: LoginComponent},
  // {path: 'company',component: CompanycertificationsComponent},
  // {path: 'ourproject',component: OurprojectComponent},
  // {path: 'dashboard', component: DashboardComponent},
  // {path: 'contact', component: ContactinformationComponent},
  // {path: '**', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
//   {
//     path: 'admin',
// // tro vao model admin trong day thi rooting cho cac page
//   }

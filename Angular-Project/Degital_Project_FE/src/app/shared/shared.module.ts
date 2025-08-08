import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../features/client/header/header.component';
import { FooterComponent } from '../features/client/footer/footer.component';
import { RouterModule } from '@angular/router'; // Cần thiết để dùng routerLink trong Header/Footer

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent] // ✅ phải export
})
export class SharedModule {}

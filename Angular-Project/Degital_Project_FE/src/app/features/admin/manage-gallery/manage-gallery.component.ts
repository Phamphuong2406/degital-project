import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-gallery.component.html',
  styleUrl: './manage-gallery.component.scss'
})
export class ManageGalleryComponent implements OnInit {

  http = inject(HttpClient)
  galleryList: any[] = [];
  ngOnInit(): void {
    this.getAllGallery();
  }
  getAllGallery() {
    this.http.get("https://localhost:7132/api/GalleryManagement").subscribe((Res: any) => {
      this.galleryList = Res;
      console.log(Res);
    })
  }
}

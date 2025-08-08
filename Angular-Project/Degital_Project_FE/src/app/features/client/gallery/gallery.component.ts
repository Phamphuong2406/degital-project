import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../core/services/gallery.service';
import { SlideGalleryInterface } from '../../../imageSliderGallery/types/slide.interface';
import { GalleryModel } from '../../../core/models/gallery.models';

@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  slides: SlideGalleryInterface[] = [];

  constructor(private galleryService: GalleryService) {}

  ngOnInit(): void {
    this.galleryService.getListGallery().subscribe({
      next: (res) => {
        this.slides = res.data.map((gallery: GalleryModel, index: number) => ({
          url: gallery.imageUrl.startsWith('http')
            ? gallery.imageUrl
            : `https://localhost:7132/Uploads/${gallery.imageUrl}`,
          number: index + 1,
        }));
      },
      error: (err) => console.error('Error loading gallery', err),
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { SlideGalleryInterface } from '../../../imageSliderGallery/types/slide.interface';
@Component({
  selector: 'app-gallery',
  standalone: false,
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  slides: SlideGalleryInterface[] = [
    { url: 'assets/Images/Rectangle 23.png', title: 'image2', number: 1 },
    { url: 'assets/Images/Rectangle 24.png', title: 'image3', number: 2 },
    { url: 'assets/Images/Rectangle 25.png', title: 'image3', number: 3 },
    { url: 'assets/Images/Rectangle 26.png', title: 'image3', number: 4 },
    { url: 'assets/Images/Rectangle 27.png', title: 'image3', number: 5 },
    { url: 'assets/Images/Rectangle 28.png', title: 'image3', number: 6 },
    { url: 'assets/Images/Rectangle 29.png', title: 'image3', number: 7 },
    { url: 'assets/Images/Rectangle 30.png', title: 'image3', number: 8 },
    { url: 'assets/Images/Rectangle 31.png', title: 'image3', number: 9 },
  ];

}



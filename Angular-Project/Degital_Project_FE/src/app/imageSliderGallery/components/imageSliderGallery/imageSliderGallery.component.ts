import { Component, Input } from "@angular/core";
import { SlideGalleryInterface } from "../../types/slide.interface";

@Component({
  selector: 'image-slider-gallery',
  standalone: false,
  templateUrl: './imageSliderGallery.component.html',
  styleUrls: ['./imageSliderGallery.component.scss'],
})
export class ImageSliderGalleryComponent {
  @Input() slides: SlideGalleryInterface[] = [];
  currentIndex = 0;

  goToPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  goToNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  getCurrentSlideUrl(): string {
    const url = this.slides[this.currentIndex]?.url;
    return url ? `url('${url}')` : '';
  }

  formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  getCurrentSlideNumber(): number {
    return this.currentIndex + 1;
  }
}

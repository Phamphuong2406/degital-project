import { Component, Input } from "@angular/core";
import { ClientModule } from "../../../features/client/client.module";
import { SlideGalleryInterface } from "../../types/slide.interface";
@Component({

  selector: 'image-slider-gallery',
  standalone: false,
  templateUrl: './imageSliderGallery.component.html',
  styleUrls: ['./imageSliderGallery.component.scss'],
})
export class ImageSliderGalleryComponent {
  @Input() slides: SlideGalleryInterface[] =[];
  currentIndex:number = 0;
  isNumber:number = 0;
  goToNext(): void {
    const isNumber = 0;
    const isLastSlide = this.currentIndex === this.slides.length -1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;
    this.currentIndex = newIndex;
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
    ? this.slides.length -1
    : this.currentIndex -1;
    this.currentIndex = newIndex;
  }

  goToNumber(): void {
    const isNumberNull = this.slides.length -1;
    this.isNumber = isNumberNull;
  }

  goToSlide(slideIndex: number): void{
    this.currentIndex = slideIndex;
  }
  getCurrentSlideUrl(): string {
    return `url('${this.slides[this.currentIndex].url}')`;
  }
  getCurrentSlideNumber(): number {
    return this.slides[this.currentIndex]?.number ?? 0;
  }

  formatNumber(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}

import { Component, Input } from "@angular/core";
import { SlideInterface } from "../../types/slide.interface";

@Component({
  selector: 'image-slider',
  standalone: false,
  templateUrl: './imageSlider.component.html',
  styleUrls: ['./imageSlider.component.scss'],
})
export class ImageSliderComponent {
  @Input() slides: SlideInterface[] = [];
  currentIndex: number = 0;

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    this.currentIndex = isLastSlide ? 0 : this.currentIndex + 1;
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    this.currentIndex = isFirstSlide ? this.slides.length - 1 : this.currentIndex - 1;
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl(): string {
    return `url('${this.slides[this.currentIndex]?.url}')`;
  }

  getCurrentSlideNumber(): number {
    return this.slides[this.currentIndex]?.number ?? 0;
  }

  formatNumber(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}

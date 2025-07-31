import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SlideInterface } from '../../../imageSlider/types/slide.interface';
@Component({
  selector: 'app-homepage',
  standalone: false,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  slides: SlideInterface[] = [
    { url: 'assets/Images/top.png',title:'image1',number: 1  },
    { url:'assets/Images/top3-2.png',title:'image2',number: 2 },
    { url:'assets/Images/top3-3.png',title:'image3',number: 3 },
  ];
}

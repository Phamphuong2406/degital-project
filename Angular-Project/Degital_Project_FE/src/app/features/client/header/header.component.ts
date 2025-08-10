import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [

    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('mainLink') mainLink!: ElementRef;
  @ViewChild('galleryLink') galleryLink!: ElementRef;
  @ViewChild('ourprojectLink') ourprojectLink!: ElementRef;
  @ViewChild('companyLink') companyLink!: ElementRef;
  @ViewChild('contactLink') contactLink!: ElementRef;
  indicatorStyle = {};
  private linkElements: Map<string, ElementRef> = new Map();

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateIndicator(event.urlAfterRedirects);
    });
  }

  ngAfterViewInit(): void {
    this.linkElements.set('main', this.mainLink);
    this.linkElements.set('gallery', this.galleryLink);
    this.linkElements.set('ourproject', this.ourprojectLink);
    this.linkElements.set('company', this.companyLink);
    this.linkElements.set('contact', this.contactLink);

    setTimeout(() => {
        this.updateIndicator(this.router.url);
        this.cdr.detectChanges();
    });
  }

  private updateIndicator(url: string): void {
    let activeTabKey = 'main';

    if (url === '/' || url.startsWith('/home')) {
      activeTabKey = 'main';
    } else if (url.startsWith('/gallery')) {
      activeTabKey = 'gallery';
    } else if (url.startsWith('/ourproject')) {
      activeTabKey = 'ourproject';
    } else if (url.startsWith('/company')) {
      activeTabKey = 'company';
    } else if (url.startsWith('/contact')) {
      activeTabKey = 'contact';
    }

    const activeElement = this.linkElements.get(activeTabKey)?.nativeElement;

    if (activeElement) {
      this.indicatorStyle = {
        'left': `${activeElement.offsetLeft}px`,
        'width': `${activeElement.offsetWidth}px`,
        'opacity': '1'
      };
    } else {
      this.indicatorStyle = { 'opacity': '0' };
    }
  }
}

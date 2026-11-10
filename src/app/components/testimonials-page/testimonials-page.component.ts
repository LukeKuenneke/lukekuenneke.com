import { Component } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-testimonials-page',
  templateUrl: './testimonials-page.component.html',
  styleUrl: './testimonials-page.component.scss',
  imports: [HeaderComponent, FooterComponent, TestimonialsComponent]
})
export class TestimonialsPageComponent {
  constructor(seo: SeoService) {
    seo.update({
      title: 'Leadership & Peer Testimonials',
      description: 'Unfiltered recommendations from the people I\'ve built and shipped with.',
      path: '/testimonials'
    });
  }
}

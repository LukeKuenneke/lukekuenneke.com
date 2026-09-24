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
      title: 'Professional Testimonials',
      description: 'Read recommendations from colleagues, leaders, and collaborators about working with Luke Kuenneke.',
      path: '/testimonials'
    });
  }
}

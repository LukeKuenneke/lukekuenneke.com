import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-testimonials-page',
  templateUrl: './testimonials-page.component.html',
  styleUrl: './testimonials-page.component.scss',
  imports: [HeaderComponent, FooterComponent, TestimonialsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestimonialsPageComponent {
  constructor() {
    inject(SeoService).update({
      title: 'Leadership & Engineering Testimonials',
      description: 'People\'s testimonials about Luke Kuenneke\'s collaboration, leadership, and delivery.',
      path: '/testimonials'
    });
  }
}

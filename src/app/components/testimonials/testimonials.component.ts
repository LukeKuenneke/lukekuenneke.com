import { Component, Input } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import testimonialFile from '../../../assets/data/testimonials.json';
import { Testimonial, TestimonialData } from './testimonial.model';


@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrl: './testimonials.component.scss',
    imports: [NgbCarouselModule],
    providers: [NgbCarouselConfig]
})

export class TestimonialsComponent {
  @Input() listView = false;
  readonly testimonialData: Testimonial[] = (testimonialFile as TestimonialData).testimonials;

  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.animation = false;
  }
}
import { Component } from '@angular/core';
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
  testimonialData: Testimonial[];

  constructor(config: NgbCarouselConfig) {
    config.interval = 10000;
    config.animation = false;
    this.testimonialData = shuffleTestimonials(
      (testimonialFile as TestimonialData).testimonials
    );
  }
}

function shuffleTestimonials(testimonials: Testimonial[]): Testimonial[] {
  const shuffled = [...testimonials];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}
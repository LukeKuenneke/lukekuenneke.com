import { Component, Input, OnInit } from '@angular/core';
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

export class TestimonialsComponent implements OnInit {
  @Input() listView = false;
  testimonialData: Testimonial[] = (testimonialFile as TestimonialData).testimonials;

  constructor(config: NgbCarouselConfig) {
    config.interval = 0;
    config.animation = false;
  }

  ngOnInit(): void {
    if (!this.listView) {
      this.testimonialData = shuffleTestimonials(this.testimonialData);
    }
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
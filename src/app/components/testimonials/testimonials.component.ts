import { Component, Input } from '@angular/core';
import testimonialFile from '../../../assets/data/testimonials.json';
import { Testimonial, TestimonialData } from './testimonial.model';

export type TestimonialCategory = 'all' | 'executive' | 'principal' | 'engineering';

interface CategoryOption {
  id: TestimonialCategory;
  label: string;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  @Input() listView = false;

  readonly testimonialData: Testimonial[] = (testimonialFile as TestimonialData).testimonials;
  selectedCategory: TestimonialCategory = 'all';

  readonly categories: CategoryOption[] = [
    { id: 'all', label: 'All' },
    { id: 'executive', label: 'C-Suite & Directors' },
    { id: 'principal', label: 'Principals & Architects' },
    { id: 'engineering', label: 'Engineering & Security' }
  ];

  // Curated executive, founder, and fellow testimonials for the home page Bento grid
  readonly featuredTestimonials: Testimonial[] = this.selectFeaturedTestimonials();

  get filteredTestimonials(): Testimonial[] {
    if (this.selectedCategory === 'all') {
      return this.testimonialData;
    }
    return this.testimonialData.filter(item => this.categorize(item) === this.selectedCategory);
  }

  selectCategory(category: TestimonialCategory): void {
    this.selectedCategory = category;
  }

  countByCategory(category: TestimonialCategory): number {
    if (category === 'all') {
      return this.testimonialData.length;
    }
    return this.testimonialData.filter(item => this.categorize(item) === category).length;
  }

  categorize(testimonial: Testimonial): Exclude<TestimonialCategory, 'all'> {
    const joined = testimonial.titles.join(' ').toLowerCase();
    if (
      joined.includes('chief technology officer') ||
      joined.includes('chief operating officer') ||
      joined.includes('co-founder') ||
      joined.includes('vice president') ||
      joined.includes('director') ||
      joined.includes('division manager') ||
      joined.includes('program manager')
    ) {
      return 'executive';
    }
    if (
      joined.includes('principal') ||
      joined.includes('fellow') ||
      joined.includes('architect') ||
      joined.includes('chief modeling')
    ) {
      return 'principal';
    }
    return 'engineering';
  }

  private selectFeaturedTestimonials(): Testimonial[] {
    const preferredTitles = [
      'Chief Operating Officer',
      'Co-Founder',
      'Technical Fellow',
      'Chief Architect',
      'Vice President of Engineering',
      'Division Manager'
    ];

    const picked: Testimonial[] = [];


    for (const target of preferredTitles) {
      const match = this.testimonialData.find(
        item => item.titles.includes(target)
      );
      if (match) {
        picked.push(match);
      }
      if (picked.length === 2) {
        break;
      }
    }
    return picked.length ? picked : this.testimonialData.slice(0, 4);
  }
}

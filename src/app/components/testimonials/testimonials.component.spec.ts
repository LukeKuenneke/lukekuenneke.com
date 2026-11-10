import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsComponent } from './testimonials.component';

describe('TestimonialsComponent', () => {
  let component: TestimonialsComponent;
  let fixture: ComponentFixture<TestimonialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render all testimonials by default', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.testimonial-card');
    expect(cards.length).toBe(component.testimonialData.length);
  });

  it('should filter testimonials by category', () => {
    const total = component.testimonialData.length;
    expect(component.filteredTestimonials.length).toBe(total);

    component.selectCategory('executive');
    fixture.detectChanges();
    expect(component.filteredTestimonials.length).toBeGreaterThan(0);
    expect(component.filteredTestimonials.length).toBeLessThan(total);

    component.selectCategory('principal');
    fixture.detectChanges();
    expect(component.filteredTestimonials.length).toBeGreaterThan(0);

    component.selectCategory('engineering');
    fixture.detectChanges();
    expect(component.filteredTestimonials.length).toBeGreaterThan(0);
  });
});

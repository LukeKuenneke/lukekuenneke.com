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

  it('should create and render 4 featured testimonials by default', () => {
    expect(component).toBeTruthy();
    expect(component.featuredTestimonials.length).toBe(4);
    const cards = fixture.nativeElement.querySelectorAll('.testimonial-card');
    expect(cards.length).toBe(4);
  });

  it('should filter testimonials by category in listView mode', () => {
    component.listView = true;
    fixture.detectChanges();

    const total = component.testimonialData.length;
    expect(component.filteredTestimonials.length).toBe(total);

    component.selectCategory('executive');
    fixture.detectChanges();
    expect(component.filteredTestimonials.length).toBe(component.countByCategory('executive'));
    expect(component.filteredTestimonials.length).toBeGreaterThan(0);

    component.selectCategory('principal');
    fixture.detectChanges();
    expect(component.filteredTestimonials.length).toBe(component.countByCategory('principal'));
    expect(component.filteredTestimonials.length).toBeGreaterThan(0);

    component.selectCategory('engineering');
    fixture.detectChanges();
    expect(component.filteredTestimonials.length).toBe(component.countByCategory('engineering'));
    expect(component.filteredTestimonials.length).toBeGreaterThan(0);
  });
});

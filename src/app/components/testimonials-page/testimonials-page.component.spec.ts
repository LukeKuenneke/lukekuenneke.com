import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TestimonialsPageComponent } from './testimonials-page.component';

describe('TestimonialsPageComponent', () => {
  let component: TestimonialsPageComponent;
  let fixture: ComponentFixture<TestimonialsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsPageComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the filterable testimonials list view', () => {
    expect(component).toBeTruthy();
    const filterButtons = fixture.nativeElement.querySelectorAll('.filter-pill');
    expect(filterButtons.length).toBe(4);
  });
});

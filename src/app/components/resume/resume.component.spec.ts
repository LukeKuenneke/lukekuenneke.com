import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResumeComponent } from './resume.component';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and expose the external résumé link', () => {
    expect(component).toBeTruthy();
    const pdfLink = fixture.nativeElement.querySelector(`a[href="${component.resumeUrl}"]`);
    expect(pdfLink).toBeTruthy();
  });
});

import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ResumeComponent } from './components/resume/resume.component';
import { TestimonialsPageComponent } from './components/testimonials-page/testimonials-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Technology Leadership and Consulting' },
  { path: 'resume', component: ResumeComponent, title: 'Résumé' },
  { path: 'testimonials', component: TestimonialsPageComponent, title: 'Testimonials' },
  { path: '404', redirectTo: '/' },
  { path: '**', redirectTo: '/404' }
];
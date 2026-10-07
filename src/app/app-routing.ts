import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResumeComponent } from './components/resume/resume.component';
import { TestimonialsPageComponent } from './components/testimonials-page/testimonials-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Luke Kuenneke', pathMatch: 'full' },
  { path: 'resume', component: ResumeComponent, title: 'Luke\'s Résumé' },
  { path: 'testimonials', component: TestimonialsPageComponent, title: 'Luke\'s Testimonials' },
  { path: '404', component: NotFoundComponent, title: 'Page not found' },
  { path: '**', component: NotFoundComponent, title: 'Page not found' }
];
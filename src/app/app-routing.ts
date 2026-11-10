import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Luke Kuenneke',
    pathMatch: 'full'
  },
  {
    path: 'resume',
    loadComponent: () => import('./components/resume/resume.component').then(m => m.ResumeComponent),
    title: 'Luke\'s Résumé'
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./components/testimonials-page/testimonials-page.component').then(m => m.TestimonialsPageComponent),
    title: 'Luke\'s Testimonials'
  },
  {
    path: '404',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page not found'
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page not found'
  }
];

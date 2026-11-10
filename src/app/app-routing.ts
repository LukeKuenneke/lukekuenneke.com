import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'resume',
    loadComponent: () => import('./components/resume/resume.component').then(m => m.ResumeComponent)
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./components/testimonials-page/testimonials-page.component').then(m => m.TestimonialsPageComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page not found | Luke Kuenneke'
  },
  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Page not found | Luke Kuenneke'
  }
];

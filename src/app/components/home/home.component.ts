import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faBluesky, faLinkedin, faGithub, faGitlab, faCodepen, faGoogleScholar } from '@fortawesome/free-brands-svg-icons';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { SeoService } from '../../seo.service';

interface SocialLink {
  label: string;
  url: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    NgOptimizedImage,
    RouterLink,
    FontAwesomeModule,
    HeaderComponent,
    FooterComponent,
    TestimonialsComponent
  ]
})
export class HomeComponent {
  constructor(seo: SeoService) {
    seo.update({
      title: 'Technology Leadership and Consulting',
      description: 'Luke Kuenneke is a technology executive and freelance consultant specializing in strategy, software engineering, cybersecurity, and resilient systems.',
      path: '/'
    });
  }

  readonly socialLinks: SocialLink[] = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/luke-kuenneke', icon: faLinkedin },
    { label: 'GitHub', url: 'https://github.com/LukeKuenneke', icon: faGithub },
    { label: 'GitLab', url: 'https://gitlab.com/LukeKuenneke', icon: faGitlab },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=Mah4kwQAAAAJ&hl=en', icon: faGoogleScholar },
    { label: 'CodePen', url: 'https://codepen.io/LukeKuenneke', icon: faCodepen },
    { label: 'Bluesky', url: 'https://bsky.app/profile/lukekuenneke.bsky.social', icon: faBluesky }
  ];
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaConfig, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faBluesky, faLinkedin, faGithub, faGitlab, faCodepen, faGoogleScholar, faImdb } from '@fortawesome/free-brands-svg-icons';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SeoService } from '../../seo.service';

interface SocialLink {
  label: string;
  url: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    NgOptimizedImage,
    RouterLink,
    FontAwesomeModule,
    HeaderComponent,
    FooterComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly socialLinks: SocialLink[] = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/luke-kuenneke', icon: faLinkedin },
    { label: 'GitHub', url: 'https://github.com/LukeKuenneke', icon: faGithub },
    { label: 'GitLab', url: 'https://gitlab.com/LukeKuenneke', icon: faGitlab },
    { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=Mah4kwQAAAAJ&hl=en', icon: faGoogleScholar },
    { label: 'CodePen', url: 'https://codepen.io/LukeKuenneke', icon: faCodepen },
    { label: 'IMDb', url: 'https://www.imdb.com/name/nm4111022/', icon: faImdb },
    { label: 'Bluesky', url: 'https://bsky.app/profile/lukekuenneke.bsky.social', icon: faBluesky }
  ];

  constructor() {
    inject(FaConfig).autoAddCss = false;
    inject(SeoService).update({
      title: 'Technology Strategist & Builder',
      description: 'Luke Kuenneke is a technology strategist and builder who scales engineering organizations, untangles complex cloud-native and distributed architectures, and ships production-critical software.',
      path: '/'
    });
  }
}

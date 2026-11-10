import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SeoService } from '../../seo.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  imports: [HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResumeComponent {
  readonly resumeUrl = 'https://drive.google.com/file/d/1UEY-sB2py8bNRuhru1bc5eV7IUXAwAB8/view?usp=sharing';

  constructor() {
    inject(SeoService).update({
      title: 'Full Résumé',
      description: 'Track record and résumé of Luke Kuenneke: technology strategist and builder specializing in Technology Leadership & Management, Software & Cloud Engineering, and Cybersecurity.',
      path: '/resume'
    });
  }
}

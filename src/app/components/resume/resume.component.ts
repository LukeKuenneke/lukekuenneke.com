import { Component } from '@angular/core';
import { SeoService } from '../../seo.service';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  readonly resumeUrl = 'https://drive.google.com/file/d/1UEY-sB2py8bNRuhru1bc5eV7IUXAwAB8/view?usp=sharing';

  constructor(seo: SeoService) {
    seo.update({
      title: 'Résumé',
      description: 'Open Luke Kuenneke\'s résumé covering technology leadership, software engineering, cybersecurity, and consulting.',
      path: '/resume'
    });
  }
}

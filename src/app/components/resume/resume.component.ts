import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { SeoService } from '../../seo.service';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrl: './resume.component.scss'
})
export class ResumeComponent implements AfterViewInit {
  readonly resumeUrl = 'https://drive.google.com/file/d/1UEY-sB2py8bNRuhru1bc5eV7IUXAwAB8/view?usp=sharing';

  constructor(
    private readonly analytics: GoogleAnalyticsService,
    private readonly seo: SeoService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngAfterViewInit(): void {
    this.seo.update({
      title: 'Résumé',
      description: 'Open Luke Kuenneke\'s résumé covering technology leadership, software engineering, cybersecurity, and consulting.',
      path: '/resume'
    });

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.analytics.event('resume_redirect', 'resume', 'open_external_resume', undefined, true);
    window.setTimeout(() => this.document.location.assign(this.resumeUrl));
  }
}

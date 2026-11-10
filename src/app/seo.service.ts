import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoPage {
  title: string;
  description: string;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly siteName = 'Luke Kuenneke';
  private readonly siteUrl = 'https://www.lukekuenneke.com';
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(page: SeoPage): void {
    const fullTitle = page.title === this.siteName ? page.title : `${page.title} | ${this.siteName}`;
    const canonicalUrl = `${this.siteUrl}${page.path}`;

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });

    const head = this.document.head;
    if (!head) {
      return;
    }

    let canonical = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }
}

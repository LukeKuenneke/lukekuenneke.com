import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, RESPONSE_INIT, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [RouterLink, HeaderComponent, FooterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  constructor() {
    const responseInit = inject(RESPONSE_INIT);
    if (responseInit) {
      responseInit.status = 404;
    }
    inject(Meta).updateTag({ name: 'robots', content: 'noindex, nofollow' });
    inject(DOCUMENT).head.querySelectorAll('link[rel="canonical"]').forEach((link) => link.remove());
  }
}

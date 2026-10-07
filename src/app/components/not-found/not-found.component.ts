import { DOCUMENT } from '@angular/common';
import { Component, RESPONSE_INIT, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [RouterLink, HeaderComponent, FooterComponent]
})
export class NotFoundComponent {
  constructor() {
    const responseInit = inject(RESPONSE_INIT);
    if (responseInit) {
      responseInit.status = 404;
    }
    inject(DOCUMENT).head.querySelector('link[rel="canonical"]')?.remove();
  }
}

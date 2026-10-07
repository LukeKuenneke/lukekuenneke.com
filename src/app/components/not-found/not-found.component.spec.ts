import { DOCUMENT } from '@angular/common';
import { RESPONSE_INIT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  it('sets the server response status to 404', async () => {
    const responseInit: ResponseInit = { status: 200 };
    const canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.href = 'https://www.lukekuenneke.com/';
    document.head.appendChild(canonical);

    await TestBed.configureTestingModule({
      imports: [NotFoundComponent, RouterTestingModule],
      providers: [
        { provide: DOCUMENT, useValue: document },
        { provide: RESPONSE_INIT, useValue: responseInit }
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(NotFoundComponent);
    fixture.detectChanges();

    expect(responseInit.status).toBe(404);
    expect(canonical.isConnected).toBeFalse();
    expect(fixture.nativeElement.querySelector('a[routerLink="/"]')).toBeTruthy();
  });
});

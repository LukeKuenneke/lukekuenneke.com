import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss'],
    standalone: false
})

export class ResumeComponent implements AfterViewInit {
  public RESUME_URL = 'https://drive.google.com/file/d/1UEY-sB2py8bNRuhru1bc5eV7IUXAwAB8/view?usp=sharing';

  constructor(@Inject(DOCUMENT) private readonly document: Document) { }

  ngAfterViewInit(): void {
    this.document.location.href = this.RESUME_URL;
  }
}

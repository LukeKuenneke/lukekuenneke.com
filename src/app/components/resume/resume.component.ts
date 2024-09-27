import { AfterViewInit, Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements AfterViewInit {
  // GDrive File Link: https://docs.google.com/uc?id=1UEY-sB2py8bNRuhru1bc5eV7IUXAwAB8
  public RESUME_URL = 'https://drive.google.com/file/d/1UEY-sB2py8bNRuhru1bc5eV7IUXAwAB8/view?usp=sharing';

  constructor(@Inject(DOCUMENT) private readonly document: Document) { }

  ngAfterViewInit(): void {
    this.document.location.href = this.RESUME_URL;
  }
}

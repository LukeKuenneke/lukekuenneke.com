import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  public RESUME_URL = 'https://docs.google.com/uc?id=1UEY-sB2py8bNRuhru1bc5eV7IUXAwAB8';

  constructor() { }

  ngOnInit(): void {
  }
}

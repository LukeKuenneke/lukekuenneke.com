import { Component, OnInit } from '@angular/core';

import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faLinkedin, faGithub, faGitlab, faCodepen } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faFilePdf = faFilePdf;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faGitlab = faGitlab;
  faCodepen = faCodepen;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

import { faFilePdf } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faLinkedin, faGithub, faGitlab, faCodepen, faGoogleScholar } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  faFilePdf = faFilePdf;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faGitlab = faGitlab;
  faCodepen = faCodepen;
  faGoogleScholar = faGoogleScholar;
  
  constructor() { }

  ngOnInit(): void {
  }

}

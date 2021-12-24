import { Component, OnInit } from '@angular/core';
import { faTwitter, faLinkedin, faGithub, faGitlab, faCodepen } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faGitlab = faGitlab;
  faCodepen = faCodepen;

  public currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
  }
}

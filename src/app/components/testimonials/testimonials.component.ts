import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { shuffle as ldShuffle } from 'lodash';

import * as testimonialFile from '../../../assets/data/testimonials.json';


@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.scss'],
    providers: [NgbCarouselConfig],
    standalone: false
})

export class TestimonialsComponent implements OnInit {
  testimonialData: any = testimonialFile;

  constructor(config: NgbCarouselConfig) {
    config.interval = 10000;
    config.animation = false;
  }

  ngOnInit(): void {
    this.testimonialData = ldShuffle(this.testimonialData.testimonials);
  }
}
import { Component, OnInit } from '@angular/core';
import * as testimonialFile from '../../../assets/data/testimonials.json';
import * as _ from "lodash";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {
  testimonialData: any = testimonialFile;

  ngOnInit(): void {
    this.testimonialData = _.shuffle(this.testimonialData.testimonials);
  }
}
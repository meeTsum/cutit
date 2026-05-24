import { Component } from '@angular/core';
import { Hero } from '../../shared/components/hero/hero';
import { Features } from '../../shared/components/features/features';
import { Showcase } from '../../shared/components/showcase/showcase';
import { HowItWorks } from '../../shared/components/how-it-works/how-it-works';
import { Testimonials } from '../../shared/components/testimonials/testimonials';


@Component({
  selector: 'app-landing-page',
  imports: [
    Hero,
    Features,
    Showcase,
    HowItWorks,
    Testimonials
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {



}
